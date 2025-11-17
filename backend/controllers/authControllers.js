// backend/controllers/authController.js
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const usersFile = path.join(__dirname, "..", "database", "users.json");
const JWT_SECRET = "CAMBIA_ESTO_POR_UN_SECRETO_MUY_SEGURO"; // cambia en producción

function readUsers() {
    if (!fs.existsSync(usersFile)) return [];
    const raw = fs.readFileSync(usersFile, "utf8");
    try { return JSON.parse(raw || "[]"); } catch { return []; }
}
function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
}

module.exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ ok: false, msg: "Faltan datos" });

    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ ok: false, msg: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = {
        id: uuidv4(),
        email,
        password: passHash,
        name: name || "Usuario",
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // generar token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "8h" });

    res.json({ ok: true, user: { id: newUser.id, email: newUser.email, name: newUser.name }, token });
};

module.exports.login = async (req, res) => {
    // aceptamos body { email, pass } o { email, password }
    const email = req.body.email;
    const password = req.body.pass || req.body.password;

    if (!email || !password) return res.status(400).json({ ok: false, msg: "Faltan datos" });

    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ ok: false, msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "8h" });

    res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name }, token });
};

module.exports.profile = (req, res) => {
    // verifyToken añade req.user
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ ok: false, msg: "Usuario no existe" });
    res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
};
