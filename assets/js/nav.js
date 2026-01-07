/* =========================================================
   Explore Portugal Experience - NAV inject (Header + Footer)
   VIP / Premium
   - Injects into #siteHeader/#siteFooter OR #site-header/#site-footer
   - Desktop: one-line menu (CSS handles no-wrap)
   - Mobile: hamburger toggle
========================================================= */

(function () {
  const MENU = [
    { label: "About", href: "/about.html" },
    { label: "Services", href: "/services.html" },
    { label: "Why us", href: "/choose.html" },
    { label: "Pricing", href: "/pricing.html" },
    { label: "FAQ", href: "/faq.html" },
    { label: "Gallery", href: "/gallery.html" },
    { label: "Booking", href: "/booking.html" },
    { label: "Partners Drivers", href: "/partners-drivers.html" },
    { label: "Commercial Partners", href: "/commercial-partners.html" },
    { label: "Contactos", href: "/contactos.html" },
  ];

  const INSTAGRAM_URL = "https://www.instagram.com/exploreportugal2025?igsh=dWlpa2hhYmIwYzho";
  const WHATSAPP_URL = "https://wa.me/"; // mete o número quando quiseres

  const STAR_SRC = "/assets/icons/apple-touch-icon.png"; // estrela
  const LOGO_SRC = "/assets/images/logo-explore-portugal-experience.png"; // logo pequeno (páginas internas)

  const path = (location.pathname || "/").toLowerCase();

  function isActive(href) {
    const h = href.toLowerCase();
    if (h === "/index.html" || h === "/") return path === "/" || path.endsWith("/index.html");
    return path.endsWith(h);
  }

  // show small brand mark on internal pages (not on index)
  const isHome = (path === "/" || path.endsWith("/index.html"));
  const brandMini = isHome ? "" : `
    <div class="page-brand" aria-hidden="false">
      <img src="${LOGO_SRC}" alt="Explore Portugal Experience">
    </div>
  `;

  const headerHTML = `
    <header class="site-header">
      <nav class="site-nav">
        <a class="nav-brand" href="/index.html" aria-label="Explore Portugal Experience home">
          <span class="nav-star" aria-hidden="true">
            <img src="${STAR_SRC}" alt="">
          </span>
        </a>

        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <span aria-hidden="true">☰</span>
        </button>

        <ul class="nav-links">
          ${MENU.map(item => `
            <li><a class="nav-link ${isActive(item.href) ? "active" : ""}" href="${item.href}">${item.label}</a></li>
          `).join("")}
        </ul>
      </nav>
      ${brandMini}
    </header>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-left">
          <div class="footer-line">© 2018 Explore Portugal Experience — Tourism in Portugal</div>
          <div class="footer-line muted">Powered by: MkDesign | London</div>
        </div>

        <div class="footer-right">
          <div class="footer-links">
            <a href="/contactos.html">Contact</a>
            <span class="dot">•</span>
            <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a>
            <span class="dot">•</span>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp</a>
            <span class="dot">•</span>
            <a href="#top" class="back-top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const headerSlot =
    document.getElementById("siteHeader") ||
    document.getElementById("site-header");

  const footerSlot =
    document.getElementById("siteFooter") ||
    document.getElementById("site-footer");

  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  // Mobile toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Back to top
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.back-top");
    if (!a) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
