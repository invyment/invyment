// Estilos/bienvenida.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bgWaves");
  if (!canvas) return;

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
    grad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
    grad.addColorStop(1, "rgba(59, 130, 246, 0.45)");

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();

      for (let x = 0; x <= w; x++) {
        const freq = 0.0025 + i * 0.0003;
        const amp = 60 - i * 15;
        const y = h / 2 + Math.sin(x * freq + t * (1.1 + i * 0.35)) * amp;
        ctx.lineTo(x, y + i * 28);
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4 + i * 0.7;
      ctx.globalAlpha = 0.30 - i * 0.08;
      ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
      ctx.shadowBlur = 18;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
});
