import express from "express";
import { enviarMensaje } from "../controllers/contactoController.js";

const router = express.Router();

router.post("/enviar", enviarMensaje);

export default router;
