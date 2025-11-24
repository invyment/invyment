/* ===========================
   RAYAS ANIMADAS
=========================== */
const canvas = document.getElementById("rayas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

class Linea {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.length = Math.random() * 300 + 150;
    this.speed = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height + this.length) {
      this.x = Math.random() * canvas.width;
      this.y = -this.length;
      this.speed = Math.random() * 3 + 1;
    }
  }

  draw() {
    const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
    grad.addColorStop(0, `rgba(0, 228, 255, ${this.opacity})`);
    grad.addColorStop(1, `rgba(0, 228, 255, 0)`);

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
  for (let i = 0; i < 90; i++) {
    lines.push(new Linea());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => {
    line.update();
    line.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

/* ===========================
   TEXTO LETRA POR LETRA
=========================== */
const texto = "Bienvenido a INVYMENT";
const textoPrincipal = document.getElementById("textoPrincipal");
const textoSecundario = document.getElementById("textoSecundario");
const btn = document.getElementById("btnContinuar");

let i = 0;

function escribir() {
  textoPrincipal.style.opacity = 1;

  if (i < texto.length) {
    textoPrincipal.innerHTML += texto.charAt(i);
    i++;
    setTimeout(escribir, 120);
  } else {
    mostrarTextoSecundario();
  }
}

function mostrarTextoSecundario() {
  textoSecundario.style.display = "block";
  setTimeout(() => {
    textoSecundario.style.opacity = 1;
  }, 200);

  // Luego mostrar el botón
  setTimeout(() => {
    btn.style.display = "block";
    setTimeout(() => (btn.style.opacity = 1), 100);
  }, 1500);
}

escribir();

/* ===========================
   BOTÓN
=========================== */
btn.addEventListener("click", () => {
  window.location.href = "registro.html";
});
