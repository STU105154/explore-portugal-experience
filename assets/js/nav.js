// Mobile menu toggle
(function () {
  const btn = document.getElementById("navToggle");
  if (!btn) return;

  btn.addEventListener("click", function () {
    document.body.classList.toggle("nav-open");
  });

  // Close menu when clicking a link (mobile)
  const nav = document.getElementById("mainNav");
  if (nav) {
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
      });
    });
  }
})();
