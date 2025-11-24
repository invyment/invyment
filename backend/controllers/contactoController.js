import { db } from "../db.js";

import { enviarCorreo } from "../utils/enviarCorreo.js";


export const enviarMensaje = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.json({ ok: false, mensaje: "Todos los campos son obligatorios." });
    }

    try {
        // Guardar en MySQL
        const sql = "INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)";
        await db.execute(sql, [nombre, correo, mensaje]);

        // Enviar correo al equipo INVYMENT
        await enviarCorreo({
            para: "invyemnt@gmail.com",
            asunto: `Nuevo mensaje de contacto - ${nombre}`,
            texto: `
Nombre: ${nombre}
Correo: ${correo}

Mensaje:
${mensaje}
            `
        });

        return res.json({ ok: true, mensaje: "Mensaje enviado correctamente." });

    } catch (error) {
        console.error("Error enviando contacto:", error);
        return res.json({ ok: false, mensaje: "Error en el servidor." });
    }
};
