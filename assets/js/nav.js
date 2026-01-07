(function () {
  const qs = (sel, root = document) => root.querySelector(sel);

  const headerTarget = qs("#siteHeader");
  const footerTarget = qs("#siteFooter");

  // Links (IGUAIS em todo o site)
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

  // Header HTML (estrela vai para home + sem mini-logo)
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
            <option value="pt">Português (original)</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
          </select>
          <div id="google_translate_element" class="gt-hidden" aria-hidden="true"></div>
        </div>

        <nav class="topnav" aria-label="Main navigation">
          ${links.map(l => `<a class="topnav-link" href="${l.href}">${l.label}</a>`).join("")}
        </nav>

        <button class="burger" id="burgerBtn" type="button" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>

      <nav class="drawer" id="drawer" aria-label="Menu">
        <div class="drawer-head">
          <div class="drawer-title">Menu</div>
          <button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">✕</button>
        </div>

        <div class="drawer-body">
          <div class="drawer-section">
            <div class="drawer-title" style="margin-bottom:10px;">Language</div>
            <div class="lang-wrap" style="width:100%;">
              <select class="lang-select" id="langSelectDrawer" aria-label="Select language (drawer)">
                <option value="pt">Português (original)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>

          <div class="drawer-links">
            ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
          </div>
        </div>
      </nav>
    </header>
  `;

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
        <div>© 2018–2025 Explore Portugal Experience — Turismo em Portugal</div>
        <div class="mkdesign">Powered by: <span>MkDesign</span> · London</div>
      </div>
    </footer>
  `;

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (footerTarget) footerTarget.innerHTML = footerHTML;

  // Drawer open/close (with scroll support)
  const burgerBtn = qs("#burgerBtn");
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");
  const drawerClose = qs("#drawerClose");

  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.documentElement.classList.add("no-scroll");
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.documentElement.classList.remove("no-scroll");
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
  }

  if (burgerBtn) burgerBtn.addEventListener("click", openDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);

  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") closeDrawer();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // --- Google Translate (stable) ---
  // We set googtrans cookie and reload
  function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
  }

  function applyGoogleTranslateLang(lang) {
    const from = "pt";
    const to = lang || "pt";
    // Google expects "/from/to"
    setCookie("googtrans", `/${from}/${to}`);
    try { localStorage.setItem("epe_lang", to); } catch(e) {}
    location.reload();
  }

  // Load GT script once
  window.googleTranslateElementInit = function () {
    try {
      new google.translate.TranslateElement(
        { pageLanguage: "pt", includedLanguages: "pt,en,es,fr,de,it", autoDisplay: false },
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

  // Sync selects (header + drawer)
  const langSelect = qs("#langSelect");
  const langSelectDrawer = qs("#langSelectDrawer");

  function setSelectValue(v){
    if (langSelect) langSelect.value = v;
    if (langSelectDrawer) langSelectDrawer.value = v;
  }

  // Restore saved language
  let saved = "pt";
  try {
    const v = localStorage.getItem("epe_lang");
    if (v) saved = v;
  } catch (e) {}
  setSelectValue(saved);

  function onLangChange(v){
    const lang = (v || "").trim();
    if (!lang) return;
    applyGoogleTranslateLang(lang);
  }

  if (langSelect) {
    langSelect.addEventListener("change", () => onLangChange(langSelect.value));
  }
  if (langSelectDrawer) {
    langSelectDrawer.addEventListener("change", () => onLangChange(langSelectDrawer.value));
  }
})();
