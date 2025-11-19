// lightbox.js
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (!galleryImages.length) return;

  // criar overlay
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Fechar imagem">&times;</button>
      <img src="" alt="Imagem de galeria ampliada">
    </div>
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox-close");

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || "Imagem de galeria ampliada";
    overlay.classList.add("open");
  }

  function close() {
    overlay.classList.remove("open");
    overlayImg.src = "";
  }

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      open(img.src, img.alt);
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      close();
    }
  });
});
