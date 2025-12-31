(function () {
  const banner = document.getElementById("cookieBanner");
  const btnAccept = document.getElementById("cookieAccept");
  const btnDecline = document.getElementById("cookieDecline");

  if (!banner || !btnAccept || !btnDecline) return;

  const KEY = "epx_cookie_choice"; // "accepted" | "declined"

  function hide() {
    banner.classList.add("hide");
    banner.setAttribute("aria-hidden", "true");
  }

  function show() {
    banner.classList.remove("hide");
    banner.setAttribute("aria-hidden", "false");
  }

  const saved = localStorage.getItem(KEY);
  if (!saved) show();
  else hide();

  btnAccept.addEventListener("click", () => {
    localStorage.setItem(KEY, "accepted");
    hide();
  });

  btnDecline.addEventListener("click", () => {
    localStorage.setItem(KEY, "declined");
    hide();
  });
})();
