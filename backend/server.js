// backend/server.js
import express from "express";
import cors from "cors";
import empresasRoutes from "./routes/empresas.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/empresas", empresasRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor INVYMENT funcionando en http://localhost:${PORT}`);
});

import contactoRoutes from "./routes/contacto.js";
app.use("/api/contacto", contactoRoutes);
