(function () {
  const KEY = "epe_cookie_consent"; // "accept" | "decline"

  function get() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function set(val) {
    try { localStorage.setItem(KEY, val); } catch {}
  }

  function buildBanner() {
    const bar = document.createElement("div");
    bar.className = "cookie-bar";
    bar.id = "cookieBar";
    bar.innerHTML = `
      <div class="cookie-inner">
        <div class="cookie-text">
          We use cookies to improve your experience and measure traffic.
        </div>
        <div class="cookie-actions">
          <button class="btn btn-ghost cookie-btn" id="cookieDecline" type="button">Decline</button>
          <button class="btn btn-gold cookie-btn" id="cookieAccept" type="button">Accept</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);
    return bar;
  }

  function show(bar) { bar.classList.add("show"); }
  function hide(bar) { bar.classList.remove("show"); }

  window.addEventListener("DOMContentLoaded", () => {
    let bar = document.getElementById("cookieBar");
    if (!bar) bar = buildBanner();

    const state = get();
    if (!state) show(bar);

    const btnA = document.getElementById("cookieAccept");
    const btnD = document.getElementById("cookieDecline");

    if (btnA) btnA.addEventListener("click", () => { set("accept"); hide(bar); });
    if (btnD) btnD.addEventListener("click", () => { set("decline"); hide(bar); });
  });
})();
