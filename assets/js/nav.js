(function () {
  function qs(sel, root = document) { return root.querySelector(sel); }

  const headerTarget = qs("#siteHeader");
  const footerTarget = qs("#siteFooter");

  const headerHTML = `
  <header class="site-header">
    <div class="container">
      <div class="header-row">
        <a class="brand" href="index.html" aria-label="Home">
          <div class="star-badge" title="Explore Portugal Experience">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l1.8 6.1L20 9.3l-5 3.6L16.8 19 12 15.7 7.2 19 9 12.9 4 9.3l6.2-1.2L12 2z"/>
            </svg>
          </div>
        </a>

        <div class="lang-wrap">
          <span class="lang-label">Language</span>
          <div class="lang-caret">
            <select class="lang-select" id="langSelect" aria-label="Select language">
              <option value="en" selected>English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <button class="burger" id="burgerBtn" aria-label="Open menu" type="button">
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="drawer-backdrop" id="drawerBackdrop"></div>
  <nav class="drawer" id="drawer" aria-label="Menu">
    <h3>Menu</h3>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="choose.html">Services</a>
    <a href="pricing.html">Pricing</a>
    <a href="faq.html">FAQ</a>
    <a href="gallery.html">Gallery</a>
    <a href="contactos.html">Contact</a>
  </nav>
  `;

  const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-row">
        <div>© 2018–2025 Explore Portugal Experience — Turismo em Portugal</div>
        <div class="footer-right">Powered by <a href="#" aria-label="MkDesign">MkDesign</a></div>
      </div>
    </div>
  </footer>
  `;

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (footerTarget) footerTarget.innerHTML = footerHTML;

  // Burger open/close
  const burgerBtn = qs("#burgerBtn");
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
  }

  if (burgerBtn && drawer && backdrop) {
    burgerBtn.addEventListener("click", openDrawer);
    backdrop.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", (e) => {
      if (e.target.tagName === "A") closeDrawer();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  // Language (simple toggler via html lang + text swap hook)
  // Nota: isto NÃO é Google Translate. É um selector limpo sem sobrepor.
  // Se quiseres tradução automática Google depois, eu faço sem estragar o layout.
  const langSelect = qs("#langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      document.documentElement.lang = langSelect.value || "en";
      // Guardar escolha
      try { localStorage.setItem("epe_lang", langSelect.value); } catch {}
    });

    // restore
    try {
      const saved = localStorage.getItem("epe_lang");
      if (saved) {
        langSelect.value = saved;
        document.documentElement.lang = saved;
      }
    } catch {}
  }
})();
