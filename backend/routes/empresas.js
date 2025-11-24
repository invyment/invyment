// backend/routes/empresas.js
import express from "express";
import { registrarEmpresa, activarEmpresa } from "../controllers/empresasController.js";

const router = express.Router();

// RUTA PARA REGISTRO DE EMPRESA
router.post("/registrar", registrarEmpresa);

// RUTA PARA ACTIVAR EMPRESA
router.post("/activar", activarEmpresa);

export default router;
