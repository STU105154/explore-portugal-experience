(function () {
  const cities = [
    "Lisbon", "Porto", "Sintra", "Cascais", "Faro", "Lagos", "Albufeira", "Coimbra", "Braga", "Aveiro",
    "Madrid", "Barcelona", "Valencia", "Seville", "Malaga", "Bilbao",
    "Paris", "Nice", "Lyon", "Marseille",
    "London", "Manchester", "Edinburgh",
    "Dublin",
    "Amsterdam", "Rotterdam",
    "Brussels",
    "Berlin", "Munich", "Hamburg", "Frankfurt",
    "Zurich", "Geneva",
    "Milan", "Rome", "Florence", "Venice",
    "Vienna",
    "Prague",
    "Budapest",
    "Warsaw",
    "Copenhagen",
    "Stockholm",
    "Oslo"
  ];

  function $(id) { return document.getElementById(id); }
  function pad(n){ return String(n).padStart(2,"0"); }

  function fillCitySelect(sel) {
    if (!sel) return;
    sel.innerHTML = `<option value="" selected>Select a city...</option>` +
      cities.map(c => `<option value="${c}">${c}</option>`).join("");
  }

  function fillTimeSelect(sel) {
    if (!sel) return;
    const step = 15;
    const opts = [];
    opts.push(`<option value="" selected>Select...</option>`);
    for (let h=0; h<24; h++){
      for (let m=0; m<60; m+=step){
        const v = `${pad(h)}:${pad(m)}`;
        opts.push(`<option value="${v}">${v}</option>`);
      }
    }
    sel.innerHTML = opts.join("");
  }

  function setReturnEnabled(enabled){
    const rd = $("returnDate");
    const rt = $("returnTime");
    if (rd) rd.disabled = !enabled;
    if (rt) rt.disabled = !enabled;
  }

  function buildWhatsAppMessage() {
    const service = $("service")?.value || "";
    const guests = $("guests")?.value || "";
    const from = $("fromCity")?.value || "";
    const to = $("toCity")?.value || "";
    const trip = $("tripType")?.value || "oneway";
    const flex = $("flexible")?.value || "exact";
    const startDate = $("startDate")?.value || "";
    const endDate = $("endDate")?.value || "";
    const depTime = $("depTime")?.value || "";
    const returnDate = $("returnDate")?.value || "";
    const returnTime = $("returnTime")?.value || "";

    const lines = [];
    lines.push("Hello! I'd like to book:");
    if (service) lines.push(`• Service: ${service}`);
    if (guests) lines.push(`• Guests: ${guests}`);
    if (from) lines.push(`• Pick-up: ${from}`);
    if (to) lines.push(`• Drop-off: ${to}`);
    lines.push(`• Trip: ${trip === "return" ? "Return (round trip)" : "One way"}`);
    lines.push(`• Dates: ${flex === "flex2" ? "±2 days" : flex === "flex3" ? "±3 days" : "Exact dates"}`);

    if (startDate) lines.push(`• Date (start): ${startDate}`);
    if (endDate && trip !== "oneway") lines.push(`• Date (end): ${endDate}`);
    if (depTime) lines.push(`• Time (departure): ${depTime}`);

    if (trip === "return") {
      if (returnDate) lines.push(`• Return date: ${returnDate}`);
      if (returnTime) lines.push(`• Return time: ${returnTime}`);
    }

    lines.push("");
    lines.push("Thank you!");
    return lines.join("\n");
  }

  function validateBasic(){
    const required = ["service","guests","fromCity","toCity","startDate","depTime","tripType","flexible"];
    for (const id of required){
      const el = $(id);
      if (!el || !el.value) return false;
    }
    const trip = $("tripType")?.value || "oneway";
    if (trip === "return") {
      if (!($("returnDate")?.value) || !($("returnTime")?.value)) return false;
    }
    return true;
  }

  window.addEventListener("DOMContentLoaded", () => {
    fillCitySelect($("fromCity"));
    fillCitySelect($("toCity"));
    fillTimeSelect($("depTime"));
    fillTimeSelect($("returnTime"));

    // default
    setReturnEnabled(false);

    const tripType = $("tripType");
    if (tripType) {
      tripType.addEventListener("change", () => {
        const isReturn = tripType.value === "return";
        setReturnEnabled(isReturn);
        // show/hide return block
        const block = $("returnBlock");
        if (block) block.style.display = isReturn ? "block" : "none";
      });
    }

    const btnContinue = $("btnContinue");
    const btnHelp = $("btnHelp");

    if (btnContinue) {
      btnContinue.addEventListener("click", () => {
        const ok = validateBasic();
        if (!ok) {
          alert("Please fill all required fields (including time).");
          return;
        }

        const msg = buildWhatsAppMessage();
        const phone = "+351962516005";
        const url = `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank");
      });
    }

    if (btnHelp) {
      btnHelp.addEventListener("click", () => {
        const phone = "+351962516005";
        const url = `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent("Hi! I need help choosing the right service.")}`;
        window.open(url, "_blank");
      });
    }
  });
})();
