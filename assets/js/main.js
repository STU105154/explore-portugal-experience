(function () {
  // Garantir que o cookie banner fica sempre clicável
  window.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById("cookieBar");
    if (bar) {
      bar.style.zIndex = "120";
    }
  });
})();
