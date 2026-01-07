(() => {
  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function buildHeader() {
    return el(`
      <header class="site-header">
        <div class="nav-wrap">
          <a class="brand" href="/index.html" aria-label="Explore Portugal Experience">
            <img class="brand-logo" src="/assets/img/logo-explore.png" alt="Explore Portugal Experience logo">
          </a>

          <button class="nav-burger" type="button" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>

          <nav class="nav">
            <a class="nav-link" href="/index.html">Home</a>
            <a class="nav-link" href="/services.html">Services</a>
            <a class="nav-link" href="/choose.html">Choose Portugal</a>
            <a class="nav-link" href="/gallery.html">Gallery</a>
            <a class="nav-link" href="/about.html">About</a>

            <!-- TOP 3 fora do More -->
            <a class="nav-link nav-gold" href="/why-us.html">Why Us</a>
            <a class="nav-link nav-gold" href="/pricing.html">Pricing</a>
            <a class="nav-link nav-gold" href="/faq.html">FAQ</a>

            <div class="nav-dropdown">
              <button class="nav-dropbtn" type="button" aria-expanded="false">More</button>
              <div class="nav-dropmenu">
                <a class="nav-link" href="/contactos.html">Contact</a>
                <div class="nav-sep"></div>
                <a class="nav-link" href="/privacy.html">Privacy</a>
                <a class="nav-link" href="/terms.html">Terms</a>
              </div>
            </div>

            <!-- BOOKING SEMPRE VISÍVEL -->
            <a class="nav-cta" href="/booking.html">Book now</a>
          </nav>
        </div>
      </header>
    `);
  }

  function buildFooter() {
    return el(`
      <footer class="site-footer">
        <div class="footer-wrap">
          <div class="footer-left">
            <div class="footer-brand">Explore Portugal Experience</div>
            <div class="footer-note">Premium Tours • Private Transfers • Local Expertise</div>
          </div>

          <div class="footer-right">
            <a class="footer-link" href="/privacy.html">Privacy</a>
            <a class="footer-link" href="/terms.html">Terms</a>
            <a class="footer-link" href="/contactos.html">Contact</a>
            <button class="to-top" type="button">Back to top</button>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} Explore Portugal Experience</div>
      </footer>
    `);
  }

  function initBurger() {
    const burger = document.querySelector(".nav-burger");
    const nav = document.querySelector(".nav");
    if (!burger || !nav) return;

    const root = document.documentElement;

    function close() {
      burger.setAttribute("aria-expanded","false");
      nav.classList.remove("is-open");
      root.classList.remove("no-scroll");
    }
    function open() {
      burger.setAttribute("aria-expanded","true");
      nav.classList.add("is-open");
      root.classList.add("no-scroll");
    }

    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initDropdown() {
    const btn = document.querySelector(".nav-dropbtn");
    const menu = document.querySelector(".nav-dropmenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });

    document.addEventListener("click", () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded","false");
    });
  }

  function initToTop() {
    const btn = document.querySelector(".to-top");
    if (!btn) return;
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  function inject() {
    document.body.prepend(buildHeader());
    document.body.appendChild(buildFooter());

    initBurger();
    initDropdown();
    initToTop();
  }

  document.addEventListener("DOMContentLoaded", inject);
})();
