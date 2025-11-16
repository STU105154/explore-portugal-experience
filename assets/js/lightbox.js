// Lightbox minimalista para as imagens da .gallery-grid
(() => {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar imagem">×</button>
    <img alt="">
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');

  const close = () => {
    overlay.classList.remove('open');
  };

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
      close();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      close();
    }
  });

  // Qualquer imagem dentro de .gallery-grid
  document.addEventListener('click', e => {
    const img = e.target.closest('.gallery-grid img');
    if (!img) return;

    const full = img.getAttribute('data-full') || img.src;
    imgEl.src = full;
    imgEl.alt = img.alt || '';
    overlay.classList.add('open');
  });
})();
