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
  <header id="top" class="site-header notranslate" data-nosnippet>
    <div class="container header-inner">

      <!-- Brand: logo only (no text) -->
      <a class="brand" href="index.html" aria-label="Explore Portugal Experience - Home">
        <img class="brand-logo" src="assets/icons/compass-gold-64.png" alt="Explore Portugal Experience" />
      </a>

      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="nav-toggle-lines" aria-hidden="true"></span>
      </button>

      <nav class="nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li><a class="nav-link ${currentPath === "index.html" ? "is-active" : ""}" href="index.html">Home</a></li>
          ${MENU.map(m =>
            `<li><a class="nav-link ${currentPath === m.href.toLowerCase() ? "is-active" : ""}" href="${m.href}">${m.label}</a></li>`
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
        <span class="footer-dot">•</span>
        <a class="footer-link footer-top" href="#top">Back to top ↑</a>
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

    bindNav();
    bindSmoothTop();
  }

  function bindNav() {
    const toggle = document.querySelector(".nav-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = document.documentElement.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function bindSmoothTop() {
    // Smooth scroll for the "Back to top" link
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href="#top"]');
      if (!a) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
