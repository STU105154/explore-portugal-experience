// NAV MOBILE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  // Fechar menu quando se clica num link (mobile)
  navMenu.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
    }
  });
});
