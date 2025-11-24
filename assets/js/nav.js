// NAVIGATION MENU SCRIPT
// Abre e fecha o menu mobile e anima o botão burger

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  // Evento para abrir/fechar menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Fecha o menu quando se clica num link dentro dele
  navMenu.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });
});
