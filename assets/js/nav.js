// assets/js/nav.js

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    body.classList.toggle("no-scroll");
  };

  hamburger.addEventListener("click", toggleMenu);

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  });
});
