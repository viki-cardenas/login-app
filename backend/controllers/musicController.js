// Controlador para artistas
const getArtists = (req, res) => {
    res.json([
        { id: 1, name: "Bad Bunny" },
        { id: 2, name: "Karol G" },
        { id: 3, name: "Dua Lipa" }
    ]);
};

// Controlador para albums
const getAlbums = (req, res) => {
    res.json([
        { id: 1, title: "Un Verano Sin Ti" },
        { id: 2, title: "Mañana Será Bonito" }
    ]);
};

// Controlador para canciones
const getSongs = (req, res) => {
    res.json([
        { id: 1, name: "Tití Me Preguntó" },
        { id: 2, name: "La Bebe" }
    ]);
};

// Controlador para playlists
const getPlaylists = (req, res) => {
    res.json([
        { id: 1, name: "Éxitos 2025" },
        { id: 2, name: "Lo Más Escuchado" }
    ]);
};

module.exports = {
    getArtists,
    getAlbums,
    getSongs,
    getPlaylists
};
