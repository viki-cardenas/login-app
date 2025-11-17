// backend/controllers/apiController.js
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataFile = path.join(__dirname, "..", "database", "data.json");
const usersFile = path.join(__dirname, "..", "database", "users.json");

function readData() {
    if (!fs.existsSync(dataFile)) return { artists: [], albums: [], songs: [], playlists: [] };
    return JSON.parse(fs.readFileSync(dataFile, "utf8") || "{}");
}
function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
}

module.exports.getArtists = (req, res) => {
    const data = readData();
    res.json({ ok: true, artists: data.artists || [] });
};

module.exports.getAlbums = (req, res) => {
    const data = readData();
    res.json({ ok: true, albums: data.albums || [] });
};

module.exports.getSongs = (req, res) => {
    const data = readData();
    res.json({ ok: true, songs: data.songs || [] });
};

module.exports.getPlaylists = (req, res) => {
    const data = readData();
    res.json({ ok: true, playlists: data.playlists || [] });
};

module.exports.addPlaylist = (req, res) => {
    const data = readData();
    const { title, songs } = req.body;
    if (!title) return res.status(400).json({ ok: false, msg: "Falta título" });

    const newPlaylist = {
        id: uuidv4(),
        title,
        songs: songs || [],
        ownerId: req.user.id,
        createdAt: new Date().toISOString()
    };

    data.playlists = data.playlists || [];
    data.playlists.push(newPlaylist);
    writeData(data);

    res.json({ ok: true, playlist: newPlaylist });
};

