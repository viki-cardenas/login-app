
const express = require("express");
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Importar rutas
const musicRoutes = require("./routes/musicRoutes");

// Usar rutas
app.use("/api", musicRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

