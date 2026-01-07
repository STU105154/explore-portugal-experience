(function () {
  const qs = (s, r = document) => r.querySelector(s);

  const headerTarget = qs("#siteHeader");
  const footerTarget = qs("#siteFooter");

  const links = [
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "choose.html", label: "Why us" },
    { href: "pricing.html", label: "Pricing" },
    { href: "faq.html", label: "FAQ" },
    { href: "gallery.html", label: "Gallery" },
    { href: "booking.html", label: "Booking" },
    { href: "partners-drivers.html", label: "Partners Drivers" },
    { href: "partners-hospitality.html", label: "Commercial Partners" },
    { href: "contactos.html", label: "Contact" },
  ];

  const headerHTML = `
  <header class="site-header" role="banner">
    <div class="container header-row">

      <a class="brand" href="index.html" aria-label="Home">
        <span class="brand-badge" aria-hidden="true">
          <img class="brand-compass" src="assets/icons/compass-gold-solid.svg" alt="">
        </span>
        <span class="brand-text">Explore Portugal Experience</span>
      </a>

      <div class="header-spacer"></div>

      <div class="lang-wrap" aria-label="Language">
        <span class="lang-label">Language</span>

        <select class="lang-select" id="langSelect" aria-label="Select language">
          <option value="">Português (original)</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
        </select>

        <!-- Widget escondido fora do ecrã (NÃO display:none) -->
        <div id="google_translate_element" class="gt-hidden" aria-hidden="true"></div>
      </div>

      <button class="burger" id="burgerBtn" type="button" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

    </div>

    <div class="drawer-backdrop" id="drawerBackdrop"></div>

    <nav class="drawer" id="drawer" aria-label="Menu">
      <div class="drawer-head">
        <div class="drawer-title">Menu</div>
        <button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">✕</button>
      </div>

      <div class="drawer-body">
        <div class="drawer-links">
          ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
        </div>
      </div>
    </nav>
  </header>`;

  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-grid">
      <div>
        <div class="footer-title">Explore Portugal Experience</div>
        <p class="footer-text">
          Premium private tours &amp; transfers in Portugal — professional drivers, comfort and discretion.
        </p>
      </div>
      <div>
        <div class="footer-title">Contact</div>
        <p class="footer-text">
          WhatsApp: <a href="https://wa.me/351962516005" target="_blank" rel="noopener">+351 962 516 005</a><br>
          Email: <a href="mailto:info@exploreportugalexperience.com">info@exploreportugalexperience.com</a>
        </p>
      </div>
      <div>
        <div class="footer-title">Follow</div>
        <p class="footer-text">
          <a href="https://www.instagram.com/exploreportugal2025" target="_blank" rel="noopener">Instagram</a><br>
          <a href="https://www.tiktok.com/@explore.portugal24" target="_blank" rel="noopener">TikTok</a>
        </p>
      </div>
    </div>

    <div class="container footer-bottom">
      <div>© 2018–2026 Explore Portugal Experience — Turismo em Portugal</div>
      <div class="mkdesign">Powered by: <span>MkDesign</span> · London</div>
    </div>
  </footer>`;

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (footerTarget) footerTarget.innerHTML = footerHTML;

  // ===== Drawer open/close =====
  const burgerBtn = qs("#burgerBtn");
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");
  const drawerClose = qs("#drawerClose");

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("no-scroll");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("no-scroll");
  }

  burgerBtn.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  backdrop.addEventListener("click", closeDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") closeDrawer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // ===== Google Translate (via cookie googtrans) =====
  function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
  }

  function applyLang(to) {
    const from = "pt";
    const val = `/${from}/${to}`;
    setCookie("googtrans", val);
    try { localStorage.setItem("epe_lang", to); } catch (e) {}
    location.reload();
  }

  window.googleTranslateElementInit = function () {
    try {
      new google.translate.TranslateElement(
        { pageLanguage: "pt", includedLanguages: "en,pt,es,fr,de,it", autoDisplay: false },
        "google_translate_element"
      );
    } catch (e) {}
  };

  const gtScriptId = "gt-script";
  if (!document.getElementById(gtScriptId)) {
    const s = document.createElement("script");
    s.id = gtScriptId;
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.head.appendChild(s);
  }

  const langSelect = qs("#langSelect");
  if (langSelect) {
    try {
      const saved = localStorage.getItem("epe_lang");
      if (saved) langSelect.value = saved === "pt" ? "" : saved;
    } catch (e) {}

    langSelect.addEventListener("change", () => {
      const v = (langSelect.value || "").trim();
      if (!v) applyLang("pt");   // voltar ao original
      else applyLang(v);
    });
  }
})();
