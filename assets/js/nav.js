/* =========================================================
   Explore Portugal Experience - NAV inject (Header + Footer)
   File: assets/js/nav.js
========================================================= */

(function () {
  const MENU = [
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "choose.html", label: "Why us" },
    { href: "pricing.html", label: "Pricing" },
    { href: "faq.html", label: "FAQ" },
    { href: "gallery.html", label: "Gallery" },
    { href: "booking.html", label: "Booking" },
    { href: "partners-drivers.html", label: "Partners Drivers" },
    { href: "commercial-partners.html", label: "Commercial Partners" },
    { href: "contactos.html", label: "Contact" }
  ];

  const INSTAGRAM_URL = "https://www.instagram.com/exploreportugal2025?igsh=dWlpa2hhYmIwYzho";
  const WHATSAPP_URL = "https://wa.me/351962516005";

  const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const headerHTML = `
  <header class="site-header notranslate" data-nosnippet>
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Explore Portugal Experience - Home">
        <span class="brand-star-wrap" aria-hidden="true">
          <img class="brand-star" src="assets/icons/apple-touch-icon.png" alt="" />
        </span>
        <span class="brand-name">Explore Portugal Experience</span>
      </a>

      <button class="nav-toggle" type="button" aria-label="Open menu">
        <span class="nav-toggle-lines" aria-hidden="true"></span>
      </button>

      <nav class="nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li><a class="nav-link ${currentPath === "index.html" ? "is-active" : ""}" href="index.html">Home</a></li>
          ${MENU.map(m =>
            `<li><a class="nav-link ${currentPath === m.href ? "is-active" : ""}" href="${m.href}">${m.label}</a></li>`
          ).join("")}
        </ul>
      </nav>
    </div>
  </header>
  `;

  const footerHTML = `
  <footer class="site-footer notranslate" data-nosnippet>
    <div class="container footer-inner">
      <div class="footer-left">
        <div>© 2018 Explore Portugal Experience — Tourism in Portugal</div>
        <div class="mk">Powered by: MkDesign | London</div>
      </div>

      <div class="footer-right">
        <a class="footer-link" href="contactos.html">Contact</a>
        <span class="footer-dot">•</span>
        <a class="footer-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a>
        <span class="footer-dot">•</span>
        <a class="footer-link" href="${WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </footer>
  `;

  function inject() {
    const h = document.getElementById("siteHeader");
    const f = document.getElementById("siteFooter");

    if (h) h.outerHTML = headerHTML.trim();
    else if (!document.querySelector(".site-header")) document.body.insertAdjacentHTML("afterbegin", headerHTML.trim());

    if (f) f.outerHTML = footerHTML.trim();
    else if (!document.querySelector(".site-footer")) document.body.insertAdjacentHTML("beforeend", footerHTML.trim());

    bind();
  }

  function bind() {
    const btn = document.querySelector(".nav-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => document.documentElement.classList.toggle("nav-open"));
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", inject)
    : inject();
})();
