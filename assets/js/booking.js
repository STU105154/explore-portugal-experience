// booking.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#booking-form");
  if (!form) return;

  const messageEl = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // validação mínima
    const required = form.querySelectorAll("[data-required]");
    let valid = true;

    required.forEach((field) => {
      if (!field.value || !field.value.trim()) {
        valid = false;
        field.classList.add("is-invalid");
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (!valid) {
      if (messageEl) {
        messageEl.textContent =
          "Por favor, confirme se todos os campos obrigatórios estão preenchidos.";
      }
      return;
    }

    if (messageEl) {
      messageEl.textContent =
        "Obrigado pelo seu pedido. Iremos responder com a proposta detalhada o mais brevemente possível.";
    }

    // como é um site estático, não há envio real:
    form.reset();
  });
});
