(function () {
  const toggle = document.getElementById("navToggle");
  const body = document.body;

  if (!toggle) return;

  toggle.addEventListener("click", function () {
    const isOpen = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // fecha menu ao clicar num link
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    if (body.classList.contains("nav-open")) {
      const clickedLink = target.closest(".nav a");
      if (clickedLink) {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });
})();
