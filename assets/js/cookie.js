(function () {
  const key = "epe_cookie_choice";
  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const decline = document.getElementById("cookieDecline");

  function hide() {
    if (banner) banner.classList.add("hide");
  }

  function show() {
    if (banner) banner.classList.remove("hide");
  }

  const saved = localStorage.getItem(key);
  if (!saved) show();
  else hide();

  if (accept) {
    accept.addEventListener("click", () => {
      localStorage.setItem(key, "accepted");
      hide();
    });
  }

  if (decline) {
    decline.addEventListener("click", () => {
      localStorage.setItem(key, "declined");
      hide();
    });
  }
})();
