// NAV MOBILE
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });

    // Fecha navbar ao clicar num link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
      });
    });
  }

  // REVIEW WIDGET FLOANTE
  const widget = document.getElementById('reviewWidget');
  const widgetClose = document.getElementById('reviewWidgetClose');
  const widgetToggle = document.getElementById('reviewWidgetToggle');

  if (widget && widgetClose && widgetToggle) {
    // Fechar caixa e mostrar botão mini
    widgetClose.addEventListener('click', function () {
      widget.style.display = 'none';
      widgetToggle.style.display = 'inline-flex';
    });

    // Reabrir caixa grande
    widgetToggle.addEventListener('click', function () {
      widget.style.display = 'block';
      widgetToggle.style.display = 'none';
    });
  }
});
