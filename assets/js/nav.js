// Navegação mobile – abre/fecha o menu hambúrguer
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const body = document.body;
  const nav = document.getElementById("mainNav");

  if (!navToggle || !nav) return;

  // Abrir / fechar menu
  navToggle.addEventListener("click", function () {
    body.classList.toggle("nav-open");
  });

  // Fechar menu quando se clica num link (em mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      body.classList.remove("nav-open");
    });
  });

  // Se o ecrã voltar a ficar grande, garantimos que o menu está visível sem a classe
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      body.classList.remove("nav-open");
    }
  });
});
