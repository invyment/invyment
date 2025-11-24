// backend/utils/enviarCorreo.js
import nodemailer from "nodemailer";

// ======================================================
// CONFIGURACIÓN DE GMAIL
// Necesita una contraseña de aplicación, NO la normal.
// ======================================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "invyment@gmail.com",     // <-- SU CORREO DE ENVÍO
    pass: "dczi qpuk mjtv zmqr"      // <-- CONTRASEÑA DE APLICACIÓN
  }
});

// Verificar conexión SMTP (Opcional pero útil)
transporter.verify((err) => {
  if (err) {
    console.error("❌ Error conectando a Gmail:", err);
  } else {
    console.log("📬 Conexión a Gmail lista para enviar correos.");
  }
});

// ======================================================
// 1) ENVIAR CORREO DE ACTIVACIÓN
// ======================================================
export const enviarCorreoActivacion = async (correoDestino, codigo) => {
  try {
    await transporter.sendMail({
      from: '"INVYMENT – Activación" <invyment@gmail.com>',
      to: correoDestino,
      subject: "Código de activación – INVYMENT",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #005eff;">Código de activación</h2>

          <p>Gracias por registrar tu empresa en <strong>INVYMENT</strong>.</p>
          <p>Tu empresa está casi lista. Solo ingresa este código en la pantalla de activación:</p>

          <h1 style="
            font-size: 38px; 
            letter-spacing: 6px; 
            color: #008cff;
            margin: 20px 0;
          ">
            ${codigo}
          </h1>

          <p>Si tú no solicitaste este registro, puedes ignorar este mensaje.</p>

          <br>
          <small style="color:#777;">
            Este correo fue generado automáticamente, no respondas a este mensaje.
          </small>
        </div>
      `
    });

    return true;
  } catch (error) {
    console.error("❌ Error enviando correo de activación:", error);
    return false;
  }
};

// ======================================================
// 2) ENVIAR CORREO DE CONTACTO
// ======================================================
export const enviarCorreo = async (nombre, correo, mensaje) => {
  try {
    await transporter.sendMail({
      from: '"INVYMENT – Contacto" <invyment@gmail.com>',
      to: "invyment@gmail.com",  // Aquí recibirá los mensajes
      subject: `Nuevo mensaje de contacto – ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#005eff;">Nuevo mensaje desde la página web</h2>

          <p><b>Nombre:</b> ${nombre}</p>
          <p><b>Correo:</b> ${correo}</p>

          <p><b>Mensaje:</b></p>
          <p style="
            background:#f5f5f5;
            padding:15px;
            border-left:4px solid #008cff;
          ">
            ${mensaje}
          </p>

          <br>
          <small style="color:#777;">Formulario de contacto del sitio INVYMENT</small>
        </div>
      `
    });

    return true;
  } catch (error) {
    console.error("❌ Error enviando correo de contacto:", error);
    return false;
  }
};
