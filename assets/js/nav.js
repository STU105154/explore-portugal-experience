(function () {
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;

  function open() {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
  }

  function close() {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.contains("nav-open") ? close() : open();
  });

  // fecha ao clicar num link do menu
  nav.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") close();
  });

  // fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("nav-open")) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    close();
  });

  // fecha no ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();
