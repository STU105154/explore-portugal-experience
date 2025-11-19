// assets/js/nav.js

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (!hamburger || !navMenu) return;

  function openMenu() {
    navMenu.classList.add("active");
    hamburger.classList.add("active");
    body.classList.add("no-scroll");
  }

  function closeMenu() {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    body.classList.remove("no-scroll");
  }

  function toggleMenu() {
    if (navMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  // Fecha o menu quando se clica num link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Fecha o menu se a janela for redimensionada para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});
