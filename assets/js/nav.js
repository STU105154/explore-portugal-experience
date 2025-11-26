document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  // abre / fecha o menu ao clicar no hambúrguer
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("nav-open");

    const isOpen = document.body.classList.contains("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // fecha o menu ao clicar num link
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // se a janela aumentar para desktop, garante que o menu mobile não fica “preso”
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900 && document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
