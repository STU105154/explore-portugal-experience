// nav.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!header || !navToggle || !nav) return;

  const links = nav.querySelectorAll("a");

  function closeNav() {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeNav();
    } else {
      header.classList.add("nav-open");
      navToggle.setAttribute("aria-expanded", "true");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      // fecha menu em mobile depois de escolher página
      if (window.innerWidth <= 960) {
        closeNav();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});
