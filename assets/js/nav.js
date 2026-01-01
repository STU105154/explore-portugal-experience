(function () {
  const qs = (s, r = document) => r.querySelector(s);

  const headerTarget = qs("#siteHeader");
  const footerTarget = qs("#siteFooter");

  // ====== EDITA AQUI O MENU (é o mesmo para todas as páginas)
  const LINKS = [
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "choose.html", label: "Why us" },
    { href: "pricing.html", label: "Pricing" },
    { href: "faq.html", label: "FAQ" },
    { href: "gallery.html", label: "Gallery" },
    { href: "booking.html", label: "Booking" },
    { href: "partners-drivers.html", label: "Partners Drivers" },
    { href: "partners-hospitality.html", label: "Commercial Partners" },
    { href: "contactos.html", label: "Contact" }
  ];

  function linksHTML(currentPath) {
    return LINKS.map(l => {
      const isCurrent = currentPath.endsWith("/" + l.href) || currentPath.endsWith(l.href);
      const aria = isCurrent ? ' aria-current="page"' : "";
      return `<a href="${l.href}"${aria}>${l.label}</a>`;
    }).join("");
  }

  const currentPath = location.pathname;

  const headerHTML = `
    <header class="site-header">
      <div class="container">
        <div class="header-row">
          <div class="brand-left">
            <a href="index.html" class="home-star" aria-label="Back to home">
              <img src="assets/icons/compass-gold-solid.svg" alt="Explore Portugal Experience" />
            </a>

            <a href="index.html" class="header-logo" aria-label="Explore Portugal Experience">
              <img src="assets/images/logo-explore-portugal-experience.png" alt="Explore Portugal Experience" />
            </a>
          </div>

          <div class="lang-wrap">
            <span class="lang-label">Language</span>
            <div class="lang-caret">
              <select class="lang-select" id="langSelect" aria-label="Select language">
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>

          <nav class="nav-inline" aria-label="Main navigation">
            ${linksHTML(currentPath)}
          </nav>

          <button class="burger" id="burgerBtn" type="button" aria-label="Open menu">
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>

    <nav class="drawer" id="drawer" aria-label="Menu">
      <h3>Menu</h3>
      ${linksHTML(currentPath)}
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

  // Drawer open/close
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");
  const burgerBtn = qs("#burgerBtn");

  function openDrawer() {
    drawer?.classList.add("open");
    backdrop?.classList.add("open");
  }
  function closeDrawer() {
    drawer?.classList.remove("open");
    backdrop?.classList.remove("open");
  }

  burgerBtn?.addEventListener("click", openDrawer);
  backdrop?.addEventListener("click", closeDrawer);
  drawer?.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") closeDrawer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Language selector (clean) — stores choice
  const langSelect = qs("#langSelect");
  const KEY = "epe_lang";

  function setLang(val) {
    document.documentElement.lang = val || "en";
    try { localStorage.setItem(KEY, val); } catch {}
  }

  // Restore saved
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && langSelect) {
      langSelect.value = saved;
      setLang(saved);
    }
  } catch {}

  langSelect?.addEventListener("change", () => {
    setLang(langSelect.value);
  });
})();
