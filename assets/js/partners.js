// partners.js
document.addEventListener("DOMContentLoaded", () => {
  const partnersForms = document.querySelectorAll("form.partners-form");
  if (!partnersForms.length) return;

  partnersForms.forEach((form) => {
    const messageEl = form.querySelector(".form-message");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

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
            "Por favor, confirme se todos os campos obrigatórios estão preenchidos antes de enviar.";
        }
        return;
      }

      if (messageEl) {
        messageEl.textContent =
          "Obrigado pelo seu interesse em colaborar connosco. Entraremos em contacto após análise dos dados enviados.";
      }

      form.reset();
    });
  });
});
