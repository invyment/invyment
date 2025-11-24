// backend/controllers/empresasController.js
import { db } from "../db.js";
import { enviarCorreoActivacion } from "../utils/enviarCorreo.js";


// -------------------------------
// GENERAR CÓDIGO ALEATORIO
// -------------------------------
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// -------------------------------
// REGISTRAR EMPRESA
// -------------------------------
export const registrarEmpresa = async (req, res) => {
  try {
    const { nombre, rfc, representante, telefono, correo, direccion, logo } = req.body;

    if (!nombre || !correo) {
      return res.status(400).json({ ok: false, mensaje: "Faltan datos obligatorios." });
    }

    const codigo = generarCodigo();

    // Guardar en MySQL
    await db.execute(
      `INSERT INTO empresas (nombre, rfc, representante, telefono, correo, direccion, logo, codigo_activacion, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')`,
      [nombre, rfc, representante, telefono, correo, direccion, logo, codigo]
    );

    // Enviar correo con código
    const enviado = await enviarCorreoActivacion(correo, codigo);

    if (!enviado) {
      return res.status(500).json({ ok: false, mensaje: "Error enviando correo." });
    }

    res.json({
      ok: true,
      mensaje: "Empresa registrada. Código enviado al correo.",
    });

  } catch (error) {
    console.error("Error registrando empresa:", error);
    res.status(500).json({ ok: false, mensaje: "Error en el servidor." });
  }
};

// -------------------------------
// ACTIVAR EMPRESA
// -------------------------------
export const activarEmpresa = async (req, res) => {
  try {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ ok: false, mensaje: "Código requerido." });
    }

    // Buscar empresa con ese código
    const [rows] = await db.execute(
      "SELECT * FROM empresas WHERE codigo_activacion = ? AND estado = 'pendiente'",
      [codigo]
    );

    if (rows.length === 0) {
      return res.status(400).json({ ok: false, mensaje: "Código incorrecto." });
    }

    // Activar empresa
    await db.execute(
      "UPDATE empresas SET estado = 'activada' WHERE codigo_activacion = ?",
      [codigo]
    );

    res.json({ ok: true, mensaje: "Empresa activada correctamente." });

  } catch (error) {
    console.error("Error activando empresa:", error);
    res.status(500).json({ ok: false, mensaje: "Error en el servidor." });
  }
};
