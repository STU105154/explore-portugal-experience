const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});
