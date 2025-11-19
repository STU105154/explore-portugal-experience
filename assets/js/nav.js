document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        nav.classList.toggle('show');
    });

    // Fecha o menu ao clicar num link (em mobile)
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });
});
