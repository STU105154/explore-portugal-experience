(function () {
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) document.body.classList.remove("nav-open");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) document.body.classList.remove("nav-open");
  });
})();
