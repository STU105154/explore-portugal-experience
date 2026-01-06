// assets/js/common.js
(function () {
  // =========================
  // MOBILE MENU (burger)
  // =========================
  const btn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");

  function toggleDrawer() {
    if (!drawer || !btn) return;
    const isOpen = drawer.style.display === "block";
    drawer.style.display = isOpen ? "none" : "block";
    btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
  }

  if (btn && drawer) {
    btn.addEventListener("click", toggleDrawer);

    // Fecha ao clicar num link
    drawer.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") {
        drawer.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // =========================
  // COOKIES (Accept / Decline)
  // =========================
  const KEY = "epe_cookie_consent";
  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const decline = document.getElementById("cookieDecline");

  function showBannerIfNeeded() {
    if (!banner) return;
    let v = null;
    try { v = localStorage.getItem(KEY); } catch (e) {}
    if (!v) banner.style.display = "block";
  }

  function setConsent(val) {
    if (!banner) return;
    try { localStorage.setItem(KEY, val); } catch (e) {}
    banner.style.display = "none";
  }

  if (accept) accept.addEventListener("click", () => setConsent("accepted"));
  if (decline) decline.addEventListener("click", () => setConsent("declined"));

  showBannerIfNeeded();
})();
