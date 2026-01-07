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

  const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // NOTE: Pediste para retirar mini logo do header -> não há logo aqui.
  // Estrela animada: assets/icons/apple-touch-icon.png (como pediste)
  const headerHTML = `
  <header class="site-header notranslate" data-nosnippet>
    <div class="container header-inner">

      <a class="brand" href="index.html" aria-label="Explore Portugal Experience - Home">
        <span class="brand-star-wrap" aria-hidden="true">
          <img class="brand-star" src="assets/icons/apple-touch-icon.png" alt="" />
        </span>
        <span class="brand-name">Explore Portugal Experience</span>
      </a>

      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle-lines" aria-hidden="true"></span>
      </button>

      <nav id="site-nav" class="nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li class="nav-item"><a class="nav-link ${currentPath === "index.html" ? "is-active" : ""}" href="index.html">Home</a></li>
          ${MENU.map(item => {
            const isActive = currentPath === item.href.toLowerCase();
            return `<li class="nav-item"><a class="nav-link ${isActive ? "is-active" : ""}" href="${item.href}">${item.label}</a></li>`;
          }).join("")}
        </ul>
      </nav>

      <!-- Opcional: se voltares a usar Google Translate, coloca o widget aqui -->
      <div class="translate-slot" aria-label="Language selector">
        <!-- <div id="google_translate_element"></div> -->
      </div>

    </div>
  </header>
  `;

  // Footer: exatamente como pediste + links (Contact / Instagram / WhatsApp)
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
        <a class="footer-link" href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <span class="footer-dot">•</span>
        <a class="footer-link" href="https://wa.me/351962516005" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </footer>
  `;

  function inject() {
    // suporte para as tuas divs antigas #siteHeader/#siteFooter
    const oldHeaderMount = document.getElementById("siteHeader");
    const oldFooterMount = document.getElementById("siteFooter");

    if (oldHeaderMount) {
      oldHeaderMount.outerHTML = headerHTML.trim();
    } else if (!document.querySelector(".site-header")) {
      document.body.insertAdjacentHTML("afterbegin", headerHTML.trim());
    }

    if (oldFooterMount) {
      oldFooterMount.outerHTML = footerHTML.trim();
    } else if (!document.querySelector(".site-footer")) {
      document.body.insertAdjacentHTML("beforeend", footerHTML.trim());
    }

    bindNav();
  }

  function bindNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#site-nav");
    if (!toggle || !nav) return;

    const close = () => {
      document.documentElement.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.documentElement.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
