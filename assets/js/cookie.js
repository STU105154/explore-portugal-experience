// assets/js/cookies.js
(function () {
  const STORAGE_KEY = "epe_cookie_choice_v1";

  function $(id) {
    return document.getElementById(id);
  }

  function hide(banner) {
    if (!banner) return;
    banner.classList.add("hide");
    banner.setAttribute("aria-hidden", "true");
  }

  function show(banner) {
    if (!banner) return;
    banner.classList.remove("hide");
    banner.setAttribute("aria-hidden", "false");
  }

  function init() {
    const banner = $("cookieBanner");
    const accept = $("cookieAccept");
    const decline = $("cookieDecline");

    // Se não existir banner nesta página, sai sem erro
    if (!banner) return;

    // Debug: se vires isto no Console, sabes que o JS está a correr
    // console.log("[cookies] init ok");

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) hide(banner);
    else show(banner);

    // Remover listeners antigos (caso o browser esteja a fazer hot reload / cache estranho)
    if (accept) {
      accept.onclick = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        hide(banner);
      };
    }

    if (decline) {
      decline.onclick = () => {
        localStorage.setItem(STORAGE_KEY, "declined");
        hide(banner);
      };
    }
  }

  // Garante que o DOM existe antes de tentar apanhar os botões
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
