const express = require("express");
const router = express.Router();

const {
    getUserProfile,
    createPlaylist,
    addSongToPlaylist,
    editPlaylist,
    deletePlaylist
} = require("../controllers/privateController");

const authMiddleware = require("../middlewares/authMiddleware");

// Todas estas rutas necesitan acceso privado
router.get("/profile", authMiddleware, getUserProfile);
router.post("/playlist", authMiddleware, createPlaylist);
router.post("/playlist/song", authMiddleware, addSongToPlaylist);
router.put("/playlist/:id", authMiddleware, editPlaylist);
router.delete("/playlist/:id", authMiddleware, deletePlaylist);

module.exports = router;
