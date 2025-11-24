document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado correctamente ✔");

  /* ================================
        REFERENCIAS DEL DOM
  =================================*/
  const input = document.getElementById("codigoActivacion");
  const resultado = document.getElementById("resultado");
  const card = document.getElementById("formularioActivacion");
  const animacion = document.getElementById("animacionExito");
  const finalMsg = document.getElementById("mensajeFinal");
  const bienvenida = document.getElementById("pantallaBienvenida");
  const modalAyuda = document.getElementById("modalAyuda");

  /* ================================
          VALIDAR CÓDIGO REAL
  =================================*/
  window.validarCodigo = async () => {
    const codigo = input.value.trim();

    if (!codigo || codigo.length !== 6) {
      resultado.textContent = "El código debe tener 6 dígitos.";
      resultado.style.color = "#ff8c8c";
      return;
    }

    resultado.textContent = "Validando...";
    resultado.style.color = "#00B7FF";

    try {
      const response = await fetch("http://localhost:3000/api/empresas/activar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo })
      });

      const res = await response.json();

      if (!res.ok) {
        resultado.textContent = res.mensaje || "Código incorrecto.";
        resultado.style.color = "#ff6b6b";
        return;
      }

      // -------------------------------
      // ANIMACIONES ORIGINALES
      // -------------------------------
      card.style.display = "none";
      animacion.style.display = "flex";

      setTimeout(() => {
        animacion.style.display = "none";
        finalMsg.style.display = "flex";
      }, 1800);

    } catch (err) {
      resultado.style.color = "red";
      resultado.textContent = "Error conectando con el servidor.";
      console.error(err);
    }
  };

  /* ================================
     CONTINUAR → PANTALLA BIENVENIDA
  =================================*/
  window.mostrarBienvenida = () => {
    finalMsg.style.display = "none";
    bienvenida.style.display = "flex";
  };

  /* ================================
        BIENVENIDA → DASHBOARD
  =================================*/
  window.mostrarDashboard = () => {
    // Redirección REAL a la página final de bienvenida
    window.location.href = "bienvenida.html";
  };

  /* ================================
              MODAL AYUDA
  =================================*/
  window.abrirAyuda = () => {
    if (!modalAyuda) {
      console.error("⚠ ERROR: No existe #modalAyuda en el HTML");
      return;
    }
    modalAyuda.style.display = "flex";
  };

  window.cerrarAyuda = () => {
    if (modalAyuda) modalAyuda.style.display = "none";
  };

  /* =======================================================
      FONDO ANIMADO – MISMAS LÍNEAS/ONDAS QUE REGISTRO
  ========================================================*/

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
