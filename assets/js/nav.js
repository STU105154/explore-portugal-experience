/* =========================================================
   Explore Portugal Experience - NAV inject (Header + Footer)
   MATCH FAQ LAYOUT (same DOM structure/classes)
   Desktop: More dropdown | Mobile: hamburger + panel scroll
   MENU (final):
   About, Services, Gallery, Booking, Partners Drivers, Commercial Partners, Contactos
   More: Why us, Pricing, FAQ
========================================================= */

(function () {
  const MENU_PRIMARY = [
    { label: "About", href: "/about.html" },
    { label: "Services", href: "/services.html" },
    { label: "Gallery", href: "/gallery.html" },
    { label: "Booking", href: "/booking.html" },
    { label: "Partners Drivers", href: "/partners-drivers.html" },
    { label: "Commercial Partners", href: "/commercial-partners.html" },
    { label: "Contactos", href: "/contactos.html" },
  ];

  const MENU_MORE = [
    { label: "Why us", href: "/choose.html" },
    { label: "Pricing", href: "/pricing.html" },
    { label: "FAQ", href: "/faq.html" },
  ];

  const INSTAGRAM_URL =
    "https://www.instagram.com/exploreportugal2025?igsh=dWlpa2hhYmIwYzho";
  const WHATSAPP_URL = "https://wa.me/"; // mete o número quando quiseres

  const STAR_SRC = "/assets/icons/apple-touch-icon.png";

  const path = (location.pathname || "/").toLowerCase();

  function isActive(href) {
    const h = (href || "").toLowerCase();
    if (h === "/" || h === "/index.html") return path === "/" || path.endsWith("/index.html");
    return path.endsWith(h);
  }

  // Build primary links
  const primaryLinksHTML = MENU_PRIMARY
    .map((item) => {
      const active = isActive(item.href) ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${active}>${item.label}</a>`;
    })
    .join("");

  // Build more dropdown links
  const moreLinksHTML = MENU_MORE
    .map((item) => {
      const active = isActive(item.href) ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${active}>${item.label}</a>`;
    })
    .join("");

  // Header HTML (MATCH FAQ)
  const headerHTML = `
<header class="site-header">
  <div class="header-inner">

    <a href="/index.html" class="home-star" aria-label="Home">
      <img src="${STAR_SRC}" alt="Explore Portugal Experience" class="star-animated">
    </a>

    <nav class="nav" id="mainNav" aria-label="Main navigation">
      ${primaryLinksHTML}
      <div class="nav-more" data-navmore>
        <button class="nav-more-btn" type="button" aria-haspopup="true" aria-expanded="false">
          More <span class="nav-more-caret" aria-hidden="true">▾</span>
        </button>
        <div class="nav-dd" role="menu" aria-label="More">
          <div class="nav-dd-list">
            ${moreLinksHTML}
          </div>
        </div>
      </div>
    </nav>

    <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

  </div>
</header>
  `.trim();

  // Footer HTML (keep yours)
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
  `.trim();

  // Inject
  const headerSlot = document.getElementById("siteHeader") || document.getElementById("site-header");
  const footerSlot = document.getElementById("siteFooter") || document.getElementById("site-footer");

  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  // =============== MOBILE MENU ===============
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.classList.toggle("no-scroll", open);
    });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("no-scroll");
    });
  }

  // =============== DESKTOP MORE DROPDOWN ===============
  const more = document.querySelector("[data-navmore]");
  if (more) {
    const btn = more.querySelector(".nav-more-btn");

    function closeMore() {
      more.classList.remove("open");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }

    function toggleMore() {
      const open = more.classList.toggle("open");
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMore();
      });
    }

    document.addEventListener("click", (e) => {
      if (!more.contains(e.target)) closeMore();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMore();
    });

    const dd = more.querySelector(".nav-dd");
    if (dd) {
      dd.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        closeMore();
      });
    }
  }

  // Back to top
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.back-top");
    if (!a) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
