(function () {
  function qs(sel, root = document) { return root.querySelector(sel); }

  const headerTarget = qs("#siteHeader");
  const footerTarget = qs("#siteFooter");

  // Se a página não tiver placeholders, não faz nada (evita partir layout)
  if (!headerTarget || !footerTarget) return;

  const headerHTML = `
    <header class="site-header" role="banner">
      <div class="container">
        <div class="header-row">
          <a class="brand" href="index.html" aria-label="Home">
            <div class="star-badge" title="Explore Portugal Experience" aria-hidden="true">
              <svg class="star-rotating" viewBox="0 0 24 24" focusable="false">
                <path d="M12 2l1.8 6.1L20 9.3l-5 3.6L16.8 19 12 15.7 7.2 19 9 12.9 4 9.3l6.2-1.2L12 2z"></path>
              </svg>
            </div>
          </a>

          <div class="lang-wrap" aria-label="Language selector">
            <span class="lang-label">Language</span>
            <div class="lang-caret">
              <select class="lang-select" id="langSelect" aria-label="Select language">
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          <button class="burger" id="burgerBtn" aria-label="Open menu" aria-controls="drawer" aria-expanded="false" type="button">
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>

    <nav class="drawer" id="drawer" aria-label="Menu">
      <h3>Menu</h3>

      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="choose.html">Why us</a>
      <a href="pricing.html">Pricing</a>
      <a href="faq.html">FAQ</a>
      <a href="gallery.html">Gallery</a>
      <a href="booking.html">Booking</a>
      <a href="partners-drivers.html">Partners Drivers</a>
      <a href="partners-hospitality.html">Commercial Partners</a>
      <a href="contactos.html">Contact</a>
    </nav>
  `;

  const footerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-row">
          <div>© 2018–2025 Explore Portugal Experience — Turismo em Portugal</div>
          <div class="footer-right">Powered by <span class="mkdesign">MkDesign</span></div>
        </div>
      </div>
    </footer>
  `;

  headerTarget.innerHTML = headerHTML;
  footerTarget.innerHTML = footerHTML;

  // Drawer open/close + scroll lock
  const burgerBtn = qs("#burgerBtn");
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");

  function lockScroll(lock) {
    document.documentElement.classList.toggle("no-scroll", !!lock);
    document.body.classList.toggle("no-scroll", !!lock);
  }

  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    backdrop.classList.add("open");
    burgerBtn?.setAttribute("aria-expanded", "true");
    lockScroll(true);
  }

  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    burgerBtn?.setAttribute("aria-expanded", "false");
    lockScroll(false);
  }

  function toggleDrawer() {
    if (!drawer) return;
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  }

  if (burgerBtn && drawer && backdrop) {
    burgerBtn.addEventListener("click", toggleDrawer);
    backdrop.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") closeDrawer();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  // Language selector (não é Google Translate; é só “lang” + persistência)
  const langSelect = qs("#langSelect");
  function setLang(value) {
    const v = value || "en";
    document.documentElement.lang = v;
    try { localStorage.setItem("epe_lang", v); } catch {}
    if (langSelect) langSelect.value = v;
  }

  if (langSelect) {
    // restore
    try {
      const saved = localStorage.getItem("epe_lang");
      if (saved) setLang(saved);
      else setLang("en");
    } catch {
      setLang("en");
    }

    langSelect.addEventListener("change", () => setLang(langSelect.value));
  }

})();
