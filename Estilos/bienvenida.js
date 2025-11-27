/* ===============================
   FONDO DE RAYAS ANIMADAS
=============================== */
const canvas = document.getElementById("rayas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

class Linea {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -200;
    this.length = Math.random() * 200 + 150;
    this.speed = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height + this.length) {
      this.x = Math.random() * canvas.width;
      this.y = -this.length;
    }
  }

  draw() {
    const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
    grad.addColorStop(0, `rgba(0, 228, 255, ${this.opacity})`);
    grad.addColorStop(1, "rgba(0, 228, 255, 0)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

function init() {
  lines = [];
  for (let i = 0; i < 90; i++) lines.push(new Linea());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => { line.update(); line.draw(); });
  requestAnimationFrame(animate);
}

init();
animate();

/* ===============================
   TEXTO LETRA POR LETRA
=============================== */
const texto = "Bienvenido a INVYMENT";
const textoAnimado = document.getElementById("textoAnimado");
const textoSecundario = document.getElementById("textoSecundario");
const btnContinuar = document.getElementById("btnContinuar");

let i = 0;

function escribir() {
  if (i < texto.length) {
    textoAnimado.innerHTML += texto.charAt(i);
    i++;
    setTimeout(escribir, 100);
  } else {
    mostrarSecundario();
  }
}

function mostrarSecundario() {
  textoSecundario.style.opacity = 1;

  setTimeout(() => {
    btnContinuar.style.opacity = 1;
  }, 800);
}

escribir();

/* ===============================
   BOTÓN
=============================== */
btnContinuar.addEventListener("click", () => {
  window.location.href = "registro.html";
});
