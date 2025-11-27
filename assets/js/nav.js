document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const body = document.body;

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      body.classList.toggle("nav-open");
    });
  }
});
