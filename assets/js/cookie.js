(function () {
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const declineBtn = document.getElementById("cookieDecline");

  if (!banner || !acceptBtn || !declineBtn) return;

  const KEY = "epe_cookie_consent"; // "accepted" | "declined"

  function hide() { banner.style.display = "none"; }
  function show() { banner.style.display = "block"; }

  const saved = localStorage.getItem(KEY);
  if (!saved) show();

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem(KEY, "accepted");
    hide();
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem(KEY, "declined");
    hide();
  });
})();
