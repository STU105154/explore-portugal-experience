document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('nav-open');
    });

    // Fecha o menu ao clicar num link (em mobile)
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
});
