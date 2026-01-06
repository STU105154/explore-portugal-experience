(function () {
  const qs = (sel, root = document) => root.querySelector(sel);

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

  function injectNavCSS() {
    const id = "epe-nav-css";
    if (document.getElementById(id)) return;

    const css = `
/* =============================
   EPE NAV FIX (Injected by nav.js)
============================= */

html, body{ overflow-x:hidden; }

/* Header */
.site-header{
  position: sticky !important;
  top: 0;
  z-index: 9999;
  background: #000;
  border-bottom: 1px solid rgba(212,169,86,0.18);
}
.site-header .container{
  width: min(1100px, calc(100% - 28px));
  margin: 0 auto;
}

/* Row */
.header-row{
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
}

/* Brand */
.brand{
  display:flex;
  align-items:center;
  gap: 10px;
  text-decoration:none;
  color: inherit;
  min-width: 0;
}
.brand-badge img{ width: 22px; height: 22px; display:block; }
.brand-logo img{
  display:block;
  height: 40px;
  width:auto;
  max-width: 220px;
}

/* Desktop nav */
.topnav{
  display:flex;
  gap: 14px;
  align-items:center;
  white-space:nowrap;
}
.topnav-link{
  text-decoration:none;
  color:#f7f3ea;
  opacity:.9;
  font-size:14px;
}

/* Language (desktop only) */
.lang-wrap{
  display:flex;
  align-items:center;
  gap: 10px;
  min-width: 260px;
}
.lang-label{
  letter-spacing: .18em;
  text-transform: uppercase;
  font-size: 12px;
  opacity: .85;
}
.lang-select{
  height: 40px;
  border-radius: 999px;
  padding: 0 14px;
  width: 100%;
  background: rgba(255,255,255,0.06);
  color: #f7f3ea;
  border: 1px solid rgba(212,169,86,0.28);
  outline:none;
}
.lang-select option{ color:#000; }

/* Burger */
.burger{
  display:none;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(212,169,86,0.28);
  background: rgba(255,255,255,0.06);
  cursor:pointer;
  align-items:center;
  justify-content:center;
}
.burger span{
  display:block;
  width: 18px;
  height: 2px;
  margin: 3px 0;
  background:#f7f3ea;
  border-radius:2px;
}

/* Drawer */
.drawer-backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity .18s ease;
  z-index: 9998;
}
.drawer-backdrop.open{
  opacity: 1;
  pointer-events: auto;
}

.drawer{
  position: fixed;
  top: 0;
  right: -340px;
  width: 340px;
  max-width: calc(100% - 42px);
  height: 100vh;
  background: #050505;
  border-left: 1px solid rgba(212,169,86,0.28);
  transition: right .18s ease;
  z-index: 9999;
  padding: 14px;
}
.drawer.open{ right: 0; }

.drawer-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  padding: 6px 2px 12px;
}
.drawer-title{
  font-size: 16px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.drawer-close{
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(212,169,86,0.28);
  background: rgba(255,255,255,0.06);
  color: #f7f3ea;
  cursor:pointer;
}

/* Drawer Language block */
.drawer-lang{
  display:flex;
  flex-direction:column;
  gap: 10px;
  padding: 10px 0 14px;
  border-bottom: 1px solid rgba(212,169,86,0.18);
  margin-bottom: 12px;
}
.drawer-lang .drawer-lang-title{
  letter-spacing: .18em;
  text-transform: uppercase;
  font-size: 12px;
  opacity: .85;
}
.drawer-lang select{
  height: 44px;
  border-radius: 999px;
  padding: 0 14px;
  width: 100%;
  background: rgba(255,255,255,0.06);
  color: #f7f3ea;
  border: 1px solid rgba(212,169,86,0.28);
  outline:none;
}
.drawer-lang select option{ color:#000; }

.drawer-links{
  display:flex;
  flex-direction:column;
  gap: 6px;
}
.drawer-links a{
  display:block;
  padding: 12px 12px;
  border-radius: 14px;
  text-decoration:none;
  color: #f7f3ea;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
}

/* ✅ MOBILE: compact header and move Language into drawer */
@media (max-width: 860px){
  .topnav{ display:none; }
  .burger{ display:flex; }

  /* Hide language in header on mobile (this fixes the huge top) */
  .lang-wrap{ display:none; }

  /* Make brand smaller for mobile */
  .brand-logo img{ height: 34px; max-width: 200px; }
  .header-row{ padding: 8px 0; }
}
    `;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  injectNavCSS();

  const headerHTML = `
    <header class="site-header" role="banner">
      <div class="container header-row">
        <a class="brand" href="index.html" aria-label="Home">
          <span class="brand-badge" aria-hidden="true">
            <img class="brand-compass" src="assets/icons/compass-gold-solid.svg" alt="">
          </span>
          <span class="brand-logo">
            <img src="assets/images/logo-explore-portugal-experience.png" alt="Explore Portugal Experience">
          </span>
        </a>

        <!-- Desktop language (hidden on mobile via CSS) -->
        <div class="lang-wrap" aria-label="Language">
          <span class="lang-label">Language</span>
          <select class="lang-select" id="langSelect" aria-label="Select language">
            <option value="">Select language</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
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

        <button class="burger" id="burgerBtn" type="button" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="drawer-backdrop" id="drawerBackdrop"></div>

      <nav class="drawer" id="drawer" aria-label="Menu">
        <div class="drawer-head">
          <div class="drawer-title">Menu</div>
          <button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">✕</button>
        </div>

        <!-- ✅ Mobile-first language lives here -->
        <div class="drawer-lang" aria-label="Language (menu)">
          <div class="drawer-lang-title">Language</div>
          <select id="langSelectDrawer" aria-label="Select language">
            <option value="">Select language</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        <div class="drawer-links">
          ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
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

  // Drawer open/close
  const burgerBtn = qs("#burgerBtn");
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");
  const drawerClose = qs("#drawerClose");

  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.documentElement.classList.add("no-scroll");
  }
  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.documentElement.classList.remove("no-scroll");
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

  // --- Google Translate ---
  function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
  }

  function applyGoogleTranslateLang(lang) {
    const from = "pt";
    const to = lang || "pt";
    setCookie("googtrans", `/${from}/${to}`);
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

  // Sync both selects (desktop + drawer)
  const langSelect = qs("#langSelect");
  const langSelectDrawer = qs("#langSelectDrawer");

  function restoreSavedLanguage() {
    try {
      const saved = localStorage.getItem("epe_lang") || "";
      if (langSelect) langSelect.value = saved;
      if (langSelectDrawer) langSelectDrawer.value = saved;
    } catch {}
  }

  function onChangeLanguage(value) {
    const v = (value || "").trim();
    try { localStorage.setItem("epe_lang", v); } catch {}
    if (v) applyGoogleTranslateLang(v);
  }

  if (langSelect) langSelect.addEventListener("change", () => onChangeLanguage(langSelect.value));
  if (langSelectDrawer) langSelectDrawer.addEventListener("change", () => onChangeLanguage(langSelectDrawer.value));

  restoreSavedLanguage();
})();
