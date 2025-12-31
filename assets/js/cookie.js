// assets/js/cookie.js
(() => {
  const KEY = "epe_cookie_choice_v3"; // muda versão se quiseres forçar reaparecer

  const getLS = () => {
    try { return localStorage.getItem(KEY) || ""; }
    catch { return ""; }
  };

  const setLS = (v) => {
    try { localStorage.setItem(KEY, v); }
    catch { /* ignore */ }
  };

  const getCookie = (name) => {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : "";
  };

  const setCookie = (name, value, days = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
  };

  const getSaved = () => getLS() || getCookie(KEY);
  const saveChoice = (v) => { setLS(v); setCookie(KEY, v, 365); };

  const qs = (id) => document.getElementById(id);

  const show = (el) => {
    if (!el) return;
    el.classList.remove("hide");
    el.setAttribute("aria-hidden", "false");
  };

  const hide = (el) => {
    if (!el) return;
    el.classList.add("hide");
    el.setAttribute("aria-hidden", "true");
  };

  const bindClick = (btn, handler) => {
    if (!btn) return;
    btn.addEventListener("click", handler);
    // alguns Androids “atrapalham-se” com overlays — isto ajuda:
    btn.addEventListener("touchstart", handler, { passive: true });
  };

  const init = () => {
    const banner = qs("cookieBanner");
    const accept = qs("cookieAccept");
    const decline = qs("cookieDecline");

    // Se não existir HTML do banner, não faz nada
    if (!banner || !accept || !decline) return;

    const saved = getSaved();
    if (saved) {
      hide(banner);
    } else {
      show(banner);
    }

    bindClick(accept, (e) => {
      e.preventDefault();
      e.stopPropagation();
      saveChoice("accepted");
      hide(banner);
    });

    bindClick(decline, (e) => {
      e.preventDefault();
      e.stopPropagation();
      saveChoice("declined");
      hide(banner);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
