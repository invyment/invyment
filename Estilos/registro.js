// ==========================================================
//  REGISTRO DE EMPRESA – ARCHIVO COMPLETO (ANIMACIÓN + API)
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

  // ==================== PREVIEW LOGO ====================
  const fileInput = document.getElementById("logoInput");
  const preview = document.getElementById("previewLogo");

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      preview.src = URL.createObjectURL(file);
    });
  }

  // ==================== FORMULARIO ====================
  const form = document.getElementById("formEmpresa");
  const msg = document.getElementById("msg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      msg.textContent = "Registrando empresa...";
      msg.style.color = "#00B7FF";

      // Convertir logo a base64
      let base64Logo = "";
      if (fileInput.files.length > 0) {
        base64Logo = await convertirBase64(fileInput.files[0]);
      }

      // Datos del formulario
      const data = {
        nombre: document.getElementById("inpNombre").value,
        rfc: document.getElementById("inpRfc").value,
        representante: document.getElementById("inpRep").value,
        telefono: document.getElementById("inpTel").value,
        correo: document.getElementById("inpCorreo").value,
        direccion: document.getElementById("inpDir").value,
        logo: base64Logo
      };

      try {
        // Enviar al backend REAL
        const response = await fetch("http://192.168.1.27:3000/api/empresas/registrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const res = await response.json();

        if (res.ok) {
          // ANIMACIÓN DE SALIDA ORIGINAL
          document.body.classList.add("fade-out");

          setTimeout(() => {
            msg.textContent = "Empresa registrada correctamente ✔";
            msg.style.color = "#4ade80";
          }, 600);

          // REDIRECCIÓN REAL AL MÓDULO DE ACTIVACIÓN
          setTimeout(() => {
            window.location.href = "activar_empresa.html";
          }, 1100);

        } else {
          msg.style.color = "red";
          msg.textContent = res.mensaje || "Error registrando empresa.";
        }

      } catch (error) {
        console.error(error);
        msg.style.color = "red";
        msg.textContent = "No se pudo conectar con el servidor.";
      }

    });
  }

  // ---------- Convertir imagen a Base64 ----------
  function convertirBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  }

  // ==================== AYUDA ====================
  window.abrirAyuda = function () {
    document.getElementById("modalAyuda").hidden = false;
  };
  window.cerrarAyuda = function () {
    document.getElementById("modalAyuda").hidden = true;
  };

  // ==================== FONDO ANIMADO (TONOS AZULES) ====================
  const canvas = document.getElementById("bgWaves");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, t = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(0,183,255,.60)");
      grad.addColorStop(1, "rgba(0,120,200,.55)");

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x++) {
          const freq = 0.0025 + i * 0.0003;
          const amp = 60 - i * 15;
          const y = h / 2 + Math.sin(x * freq + t * (1.15 + i * .35)) * amp;
          ctx.lineTo(x, y + i * 25);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4 + i * .8;
        ctx.globalAlpha = 0.32 - i * 0.1;
        ctx.shadowColor = "rgba(0,183,255,.45)";
        ctx.shadowBlur = 20;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    draw();
  }

});

