document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const correo = form.correo.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (!nombre || !correo || !mensaje) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const res = await fetch("http://localhost:3000/api/contacto/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, mensaje })
        });

        const data = await res.json();

        if (data.ok) {
            alert("Mensaje enviado, gracias por contactarnos ✔");
            form.reset();
        } else {
            alert("Hubo un problema: " + data.mensaje);
        }
    });
});
