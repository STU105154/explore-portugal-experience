(function () {
  const KEY = "epe_cookie_consent"; // "accept" | "decline"

  function get() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function set(val) {
    try { localStorage.setItem(KEY, val); } catch {}
  }

  function ensureStyles() {
    if (document.getElementById("cookieBarStyles")) return;

    const style = document.createElement("style");
    style.id = "cookieBarStyles";
    style.textContent = `
      .cookie-bar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 12px;
        z-index: 99999;
        display: none;
        pointer-events: auto;
      }
      .cookie-inner{
        max-width: 980px;
        margin: 0 auto;
        background: rgba(10,10,10,0.88);
        border: 1px solid rgba(212,175,55,0.35);
        border-radius: 18px;
        padding: 14px 14px;
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        backdrop-filter: blur(10px);
      }
      .cookie-text{
        color: #eaeaea;
        font-size: 14px;
        line-height: 1.25;
        flex: 1;
        min-width: 180px;
      }
      .cookie-actions{
        display: flex;
        gap: 10px;
        flex-shrink: 0;
      }
      .cookie-actions button{
        border-radius: 999px;
        padding: 10px 16px;
        border: 1px solid rgba(212,175,55,0.45);
        background: transparent;
        color: #f2f2f2;
        font-weight: 600;
        cursor: pointer;
      }
      .cookie-actions .cookie-accept{
        background: rgba(212,175,55,0.9);
        color: #111;
        border-color: rgba(212,175,55,0.9);
      }
      @media (max-width: 520px){
        .cookie-inner{
          margin: 0 12px;
          flex-direction: column;
          align-items: stretch;
        }
        .cookie-actions{
          width: 100%;
        }
        .cookie-actions button{
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildBanner() {
    const bar = document.createElement("div");
    bar.className = "cookie-bar";
    bar.id = "cookieBar";
    bar.innerHTML = `
      <div class="cookie-inner" role="dialog" aria-label="Cookie consent">
        <div class="cookie-text">
          We use cookies to improve your experience and measure traffic.
        </div>
        <div class="cookie-actions">
          <button class="cookie-decline" id="cookieDecline" type="button">Decline</button>
          <button class="cookie-accept" id="cookieAccept" type="button">Accept</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);
    return bar;
  }

  function show(bar) { bar.style.display = "block"; }
  function hide(bar) { bar.style.display = "none"; }

  window.addEventListener("DOMContentLoaded", () => {
    ensureStyles();

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
