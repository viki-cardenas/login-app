const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Falta token." });
    }

    // Validación simple de token (en un proyecto real usarías JWT)
    if (token !== "mipassword123") {
        return res.status(403).json({ error: "Token inválido." });
    }

    next();
};

module.exports = authMiddleware;

