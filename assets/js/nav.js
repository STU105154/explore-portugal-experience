document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  if (!navToggle || !nav) return;

  function toggleNav() {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("nav-open", !expanded);
  }

  navToggle.addEventListener("click", toggleNav);

  // Fecha o menu ao clicar num link (em mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("nav-open")) {
        toggleNav();
      }
    });
  });
});
