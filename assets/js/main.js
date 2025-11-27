document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fechar menu ao clicar num link (mobile)
  nav.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "a" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
