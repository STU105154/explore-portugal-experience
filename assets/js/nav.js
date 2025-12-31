(function () {
  const burger = document.getElementById("navToggle");
  const drawer = document.getElementById("drawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const closeBtn = document.getElementById("drawerClose");

  if (!burger || !drawer) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  backdrop && backdrop.addEventListener("click", closeDrawer);
  closeBtn && closeBtn.addEventListener("click", closeDrawer);

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // close when clicking a link inside the drawer
  drawer.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeDrawer);
  });
})();
