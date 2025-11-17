const express = require("express");
const router = express.Router();
const {
    getArtists,
    getAlbums,
    getSongs,
    getPlaylists
} = require("../controllers/musicController");

// Rutas públicas de lectura
router.get("/artists", getArtists);
router.get("/albums", getAlbums);
router.get("/songs", getSongs);
router.get("/playlists", getPlaylists);

module.exports = router;
