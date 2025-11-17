// ===============================
//  CONFIGURACIÓN
// ===============================

// Cambia el puerto si tu backend usa otro
const API_URL = "http://localhost:3000/api";

// Token falso para pruebas
let token = localStorage.getItem("token") || null;


// ===============================
//  AUTENTICACIÓN
// ===============================

// Login
export async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            token = data.token;
            localStorage.setItem("token", token);
        }

        return data;
    } catch (err) {
        console.error("Error en login:", err);
    }
}


// ===============================
//  RUTAS PÚBLICAS
// ===============================

// Obtener artistas
export async function getArtists() {
    const res = await fetch(`${API_URL}/artists`);
    return res.json();
}

// Obtener álbumes
export async function getAlbums() {
    const res = await fetch(`${API_URL}/albums`);
    return res.json();
}

// Obtener canciones
export async function getSongs() {
    const res = await fetch(`${API_URL}/songs`);
    return res.json();
}

// Obtener playlists públicas
export async function getPlaylists() {
    const res = await fetch(`${API_URL}/playlists`);
    return res.json();
}


// ===============================
//  RUTAS PRIVADAS
// ===============================

// Obtener perfil del usuario
export async function getProfile() {
    const res = await fetch(`${API_URL}/private/profile`, {
        headers: { "Authorization": token }
    });
    return res.json();
}


// Crear playlist
export async function createPlaylist(name) {
    const res = await fetch(`${API_URL}/private/playlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ name })
    });

    return res.json();
}


// Agregar canción a playlist
export async function addSongToPlaylist(playlistId, songName) {
    const res = await fetch(`${API_URL}/private/playlist/song`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ playlistId, songName })
    });

    return res.json();
}


// Renombrar playlist
export async function renamePlaylist(id, newName) {
    const res = await fetch(`${API_URL}/private/playlist/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ newName })
    });

    return res.json();
}


// Eliminar playlist
export async function deletePlaylist(id) {
    const res = await fetch(`${API_URL}/private/playlist/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
    });

    return res.json();
}
