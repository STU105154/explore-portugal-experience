// assets/js/lightbox.js
// Lightbox simples para a galeria

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn   = lightbox.querySelector('.lightbox-close');
  const items      = document.querySelectorAll('.gallery-item');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const full = this.getAttribute('data-full') || this.getAttribute('href');
      const img  = this.querySelector('img');
      const alt  = img ? img.alt : '';
      if (full) openLightbox(full, alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});
