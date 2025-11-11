// Lightbox minimalista para .gallery-grid img
(() => {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar">×</button>
    <img alt="">
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const close = () => overlay.classList.remove('open');

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.addEventListener('click', e => {
    const img = e.target.closest('.gallery-grid img');
    if (!img) return;
    imgEl.src = img.getAttribute('data-full') || img.src;
    overlay.classList.add('open');
  });
})();
