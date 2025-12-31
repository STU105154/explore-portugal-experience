// assets/js/nav.js
(function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (!navToggle || !mainNav) return;

  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function toggleNav() {
    document.body.classList.toggle("nav-open");
    const isOpen = document.body.classList.contains("nav-open");
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", toggleNav);

  // Fecha ao clicar num link
  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeNav);
  });

  // Fecha ao clicar fora do menu (mobile)
  document.addEventListener("click", (e) => {
    const isOpen = document.body.classList.contains("nav-open");
    if (!isOpen) return;

    const clickedInside =
      mainNav.contains(e.target) || navToggle.contains(e.target);

    if (!clickedInside) closeNav();
  });

  // Fecha ao fazer resize para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });
})();
