(function () {
  // ---------- BURGER MENU ----------
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    if (!nav || !navToggle) return;
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", toggleNav);
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      const clickInside = nav.contains(e.target) || navToggle.contains(e.target);
      if (!clickInside) closeNav();
    });
  }

  // ---------- TIME OPTIONS (15 MIN) ----------
  function fillTimeSelect(selectEl) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select…";
    placeholder.selected = true;
    placeholder.disabled = true;
    selectEl.appendChild(placeholder);

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        const opt = document.createElement("option");
        opt.value = `${hh}:${mm}`;
        opt.textContent = `${hh}:${mm}`;
        selectEl.appendChild(opt);
      }
    }
  }

  fillTimeSelect(document.getElementById("timeDepart"));
  fillTimeSelect(document.getElementById("timeReturn"));

  // ---------- CITY LISTS ----------
  const citiesPortugal = [
    "Lisbon", "Porto", "Faro", "Sintra", "Cascais", "Estoril", "Coimbra", "Braga",
    "Guimarães", "Aveiro", "Évora", "Óbidos", "Nazaré", "Fátima", "Setúbal",
    "Albufeira", "Lagos", "Tavira", "Portimão", "Madeira (Funchal)", "Azores (Ponta Delgada)"
  ];

  const citiesEurope = [
    "Madrid", "Barcelona", "Seville", "Valencia", "Bilbao",
    "Paris", "Nice", "Lyon",
    "London", "Manchester", "Edinburgh",
    "Amsterdam", "Brussels",
    "Rome", "Milan", "Venice",
    "Berlin", "Munich", "Frankfurt",
    "Zurich", "Geneva",
    "Vienna", "Prague",
    "Dublin",
    "Copenhagen", "Stockholm", "Oslo",
    "Athens",
    "Istanbul"
  ];

  function fillCitySelect(selectEl) {
    if (!selectEl) return;

    selectEl.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = "Select…";
    ph.selected = true;
    ph.disabled = true;
    selectEl.appendChild(ph);

    const optGroupPT = document.createElement("optgroup");
    optGroupPT.label = "Portugal";
    citiesPortugal.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      optGroupPT.appendChild(opt);
    });

    const optGroupEU = document.createElement("optgroup");
    optGroupEU.label = "Europe (main cities)";
    citiesEurope.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      optGroupEU.appendChild(opt);
    });

    selectEl.appendChild(optGroupPT);
    selectEl.appendChild(optGroupEU);
  }

  fillCitySelect(document.getElementById("fromCity"));
  fillCitySelect(document.getElementById("toCity"));

  // ---------- RETURN FIELDS TOGGLE ----------
  const tripType = document.getElementById("tripType");
  const returnFields = document.getElementById("returnFields");
  const dateReturn = document.getElementById("dateReturn");
  const timeReturn = document.getElementById("timeReturn");

  function updateReturnFields() {
    if (!tripType || !returnFields) return;
    const isReturn = tripType.value === "Return";
    returnFields.hidden = !isReturn;

    if (dateReturn) dateReturn.required = isReturn;
    if (timeReturn) timeReturn.required = isReturn;
  }

  if (tripType) {
    tripType.addEventListener("change", updateReturnFields);
    updateReturnFields();
  }

  // ---------- BOOKING SUBMIT (WHATSAPP) ----------
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const service = document.getElementById("service")?.value || "";
      const guests = document.getElementById("guests")?.value || "";
      const from = document.getElementById("fromCity")?.value || "";
      const to = document.getElementById("toCity")?.value || "";
      const dateStart = document.getElementById("dateStart")?.value || "";
      const flex = document.getElementById("flex")?.value || "";
      const timeDepart = document.getElementById("timeDepart")?.value || "";
      const type = document.getElementById("tripType")?.value || "One way";
      const dReturn = document.getElementById("dateReturn")?.value || "";
      const tReturn = document.getElementById("timeReturn")?.value || "";

      // basic validation
      if (!service || !guests || !from || !to || !dateStart || !timeDepart) {
        alert("Please fill the required fields.");
        return;
      }
      if (type === "Return" && (!dReturn || !tReturn)) {
        alert("Please fill the return date and time.");
        return;
      }

      const msgLines = [
        "Hello! I’d like to book:",
        `• Service: ${service}`,
        `• Guests: ${guests}`,
        `• From: ${from}`,
        `• To: ${to}`,
        `• Trip: ${type}`,
        `• Date (Start): ${dateStart}`,
        `• Time (Departure): ${timeDepart}`,
        flex && flex !== "No" ? `• Flexible dates: ${flex}` : null,
        type === "Return" ? `• Return date: ${dReturn}` : null,
        type === "Return" ? `• Return time: ${tReturn}` : null,
        "",
        "Thank you!"
      ].filter(Boolean);

      const text = encodeURIComponent(msgLines.join("\n"));
      // WhatsApp number (as per your QR)
      const wa = `https://wa.me/351910784548?text=${text}`;
      window.open(wa, "_blank", "noopener");
    });
  }
})();
