/* =========================================================
   Explore Portugal Experience - NAV inject (Header + Footer)
   File: assets/js/nav.js
========================================================= */

(function () {
  const PRIMARY = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "pricing.html", label: "Pricing" },
    { href: "booking.html", label: "Booking" },
    { href: "contactos.html", label: "Contact" }
  ];

  // Less important links go inside "More"
  const MORE = [
    { href: "choose.html", label: "Why us" },
    { href: "faq.html", label: "FAQ" },
    { href: "gallery.html", label: "Gallery" },
    { href: "partners-drivers.html", label: "Partners Drivers" },
    { href: "commercial-partners.html", label: "Commercial Partners" }
  ];

  const INSTAGRAM_URL = "https://www.instagram.com/exploreportugal2025?igsh=dWlpa2hhYmIwYzho";
  const WHATSAPP_URL = "https://wa.me/351962516005";

  const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  function linkItem(item) {
    const isActive = currentPath === item.href.toLowerCase();
    return `<li class="nav-item">
      <a class="nav-link ${isActive ? "is-active" : ""}" href="${item.href}">${item.label}</a>
    </li>`;
  }

  function moreItem(item) {
    const isActive = currentPath === item.href.toLowerCase();
    return `<li>
      <a class="nav-more-link ${isActive ? "is-active" : ""}" href="${item.href}">${item.label}</a>
    </li>`;
  }

  const headerHTML = `
  <header id="top" class="site-header notranslate" data-nosnippet>
    <div class="container header-inner">

      <!-- Brand: star only (premium, small) -->
      <a class="brand" href="index.html" aria-label="Explore Portugal Experience - Home">
        <span class="brand-star-wrap" aria-hidden="true">
          <img class="brand-star" src="assets/icons/apple-touch-icon.png" alt="" />
        </span>
      </a>

      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="nav-toggle-lines" aria-hidden="true"></span>
      </button>

      <nav class="nav" aria-label="Main navigation">
        <ul class="nav-list">
          ${PRIMARY.map(linkItem).join("")}

          <li class="nav-item nav-more">
            <details class="nav-more-details">
              <summary class="nav-link nav-more-summary">More <span class="nav-caret">▾</span></summary>
              <ul class="nav-more-menu">
                ${MORE.map(moreItem).join("")}
              </ul>
            </details>
          </li>
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
    bindCloseMoreOnOutsideClick();
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
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href="#top"]');
      if (!a) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function bindCloseMoreOnOutsideClick(){
    document.addEventListener("click", (e) => {
      const details = document.querySelector(".nav-more-details");
      if (!details || !details.open) return;
      if (e.target.closest(".nav-more-details")) return;
      details.open = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
