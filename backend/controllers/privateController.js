// BASE DE DATOS SIMULADA
let playlists = [
    { id: 1, name: "Mis Favoritas", songs: [] }
];

// Ver perfil del usuario
const getUserProfile = (req, res) => {
    res.json({
        id: 1,
        name: "Usuario Spotify",
        email: "usuario@email.com"
    });
};

// Crear playlist
const createPlaylist = (req, res) => {
    const { name } = req.body;

    const newPlaylist = {
        id: playlists.length + 1,
        name,
        songs: []
    };

    playlists.push(newPlaylist);

    res.json({ message: "Playlist creada", playlist: newPlaylist });
};

// Agregar canción a playlist
const addSongToPlaylist = (req, res) => {
    const { playlistId, songName } = req.body;

    const playlist = playlists.find(p => p.id === playlistId);

    if (!playlist) {
        return res.status(404).json({ error: "Playlist no encontrada" });
    }

    playlist.songs.push(songName);

    res.json({ message: "Canción agregada", playlist });
};

// Editar playlist
const editPlaylist = (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;

    const playlist = playlists.find(p => p.id == id);

    if (!playlist) {
        return res.status(404).json({ error: "Playlist no encontrada" });
    }

    playlist.name = newName;

    res.json({ message: "Playlist renombrada", playlist });
};

// Eliminar playlist
const deletePlaylist = (req, res) => {
    const { id } = req.params;

    playlists = playlists.filter(p => p.id != id);

    res.json({ message: "Playlist eliminada" });
};

module.exports = {
    getUserProfile,
    createPlaylist,
    addSongToPlaylist,
    editPlaylist,
    deletePlaylist
};
