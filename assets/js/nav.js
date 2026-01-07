/* =========================================================
   Explore Portugal Experience - NAV inject (Header + Footer)
   Stable burger drawer (mobile + desktop) + scroll lock
   + Anti auto-translate (Chrome) + correct links
========================================================= */

(function () {
  const headerMount = document.getElementById("siteHeader");
  const footerMount = document.getElementById("siteFooter");
  if (!headerMount || !footerMount) return;

  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // ✅ FINAL MENU (per your repo)
  const links = [
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "choose.html", label: "Why us" },                 // ✅ choose.html (exists)
    { href: "pricing.html", label: "Pricing" },
    { href: "faq.html", label: "FAQ" },
    { href: "gallery.html", label: "Gallery" },
    { href: "booking.html", label: "Booking" },
    { href: "partners-drivers.html", label: "Partners Drivers" },
    { href: "commercial-partners.html", label: "Commercial Partners" }, // ✅ exists
    { href: "contactos.html", label: "Contact" },            // ✅ contactos.html (exists)
  ];

  const topNavHtml = links
    .map((l) => {
      const isActive = current === l.href.toLowerCase();
      return `<a class="topnav-link${isActive ? " is-active" : ""}" href="${l.href}">${l.label}</a>`;
    })
    .join("");

  const drawerLinksHtml = links
    .map((l) => {
      const isActive = current === l.href.toLowerCase();
      return `<a class="${isActive ? "is-active" : ""}" href="${l.href}">${l.label}</a>`;
    })
    .join("");

  // ✅ Anti auto-translate: translate="no" + notranslate on header UI
  const headerHtml = `
<header class="site-header notranslate" translate="no" role="banner">
  <div class="container">
    <div class="header-row">

      <a class="brand notranslate" translate="no" href="index.html" aria-label="Explore Portugal Experience home">
        <span class="brand-badge" aria-hidden="true">
          <img class="brand-compass" src="assets/icons/compass-gold.png" alt="">
        </span>
        <span class="brand-text">EXPLORE PORTUGAL EXPERIENCE</span>
      </a>

      <div class="header-spacer"></div>

      <div class="lang-wrap notranslate" translate="no" aria-label="Language selector">
        <span class="lang-label">LANGUAGE</span>
        <select class="lang-select" id="langSelect" aria-label="Select language">
          <option value="en" selected>English</option>
          <option value="pt">Português</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
        </select>
      </div>

      <nav class="topnav" aria-label="Primary">
        ${topNavHtml}
      </nav>

      <button class="burger" id="burgerBtn" type="button"
        aria-label="Open menu"
        aria-controls="drawer"
        aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

    </div>
  </div>
</header>

<div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>

<aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true">
  <div class="drawer-head">
    <div class="drawer-title notranslate" translate="no">Menu</div>
    <button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">✕</button>
  </div>

  <div class="drawer-body">
    <div class="drawer-section notranslate" translate="no">
      <div class="drawer-mini-title">Language</div>
      <div class="drawer-lang">
        <select class="lang-select" id="langSelectDrawer" aria-label="Select language">
          <option value="en" selected>English</option>
          <option value="pt">Português</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
        </select>
      </div>
    </div>

    <div class="drawer-links" aria-label="Menu links">
      ${drawerLinksHtml}
    </div>
  </div>
</aside>
`;

  // ✅ Footer: real contacts (your WhatsApp)
  const footerHtml = `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
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
        <div class="footer-title">Links</div>
        <p class="footer-text">
          <a href="booking.html">Booking</a><br>
          <a href="pricing.html">Pricing</a><br>
          <a href="faq.html">FAQ</a><br>
          <a href="privacy.html">Privacy</a>
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <div>© ${new Date().getFullYear()} Explore Portugal Experience</div>
      <div class="mkdesign">Powered by: <span>MkDesign</span> · London</div>
    </div>
  </div>
</footer>
`;

  headerMount.innerHTML = headerHtml;
  footerMount.innerHTML = footerHtml;

  // -------- burger drawer behavior (toggle + scroll lock) --------
  const html = document.documentElement;
  const burgerBtn = document.getElementById("burgerBtn");
  const drawer = document.getElementById("drawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const closeBtn = document.getElementById("drawerClose");

  function isOpen() {
    return drawer && drawer.classList.contains("open");
  }

  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.classList.add("open");
    burgerBtn && burgerBtn.setAttribute("aria-expanded", "true");
    html.classList.add("no-scroll");
  }

  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("open");
    burgerBtn && burgerBtn.setAttribute("aria-expanded", "false");
    html.classList.remove("no-scroll");
  }

  function toggleDrawer() {
    if (isOpen()) closeDrawer();
    else openDrawer();
  }

  if (burgerBtn) burgerBtn.addEventListener("click", toggleDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  drawer && drawer.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (a) closeDrawer();
  });

  // -------- language selector (UI only) --------
  const langTop = document.getElementById("langSelect");
  const langDrawer = document.getElementById("langSelectDrawer");

  function syncLang(value) {
    if (langTop) langTop.value = value;
    if (langDrawer) langDrawer.value = value;
  }

  function onLangChange(e) {
    const v = e.target.value;
    syncLang(v);
    try { localStorage.setItem("epe_lang", v); } catch (_) {}
  }

  if (langTop) langTop.addEventListener("change", onLangChange);
  if (langDrawer) langDrawer.addEventListener("change", onLangChange);

  try {
    const saved = localStorage.getItem("epe_lang");
    if (saved) syncLang(saved);
  } catch (_) {}
})();
