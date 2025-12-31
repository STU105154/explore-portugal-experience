(function () {
  const tripType = document.getElementById("trip_type");
  const returnFields = document.getElementById("returnFields");

  const dateStart = document.getElementById("date_start");
  const dateEnd = document.getElementById("date_end");
  const dateEndRow = document.getElementById("dateEndRow");

  const returnDate = document.getElementById("return_date");
  const returnTime = document.getElementById("return_time");
  const returnFrom = document.getElementById("return_from");
  const returnTo = document.getElementById("return_to");

  // Set min dates (today) and sensible max (today + 365 days)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  const max = new Date(today);
  max.setDate(max.getDate() + 365);
  const maxDate = `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, "0")}-${String(max.getDate()).padStart(2, "0")}`;

  [dateStart, dateEnd, returnDate].forEach((el) => {
    el.min = minDate;
    el.max = maxDate;
  });

  // default end date = start date
  dateStart.addEventListener("change", () => {
    if (!dateEnd.value || dateEnd.value < dateStart.value) {
      dateEnd.value = dateStart.value;
    }
    // if return chosen, force return date >= start date
    if (tripType.value === "return") {
      if (!returnDate.value || returnDate.value < dateStart.value) {
        returnDate.value = dateStart.value;
      }
    }
  });

  // keep end date >= start date
  dateEnd.addEventListener("change", () => {
    if (dateEnd.value < dateStart.value) dateEnd.value = dateStart.value;
  });

  function setReturnMode(isReturn) {
    if (isReturn) {
      returnFields.style.display = "block";

      // require return fields
      returnFrom.required = true;
      returnTo.required = true;
      returnDate.required = true;
      returnTime.required = true;

      // show date end (range)
      dateEndRow.style.display = "block";
      dateEnd.required = true;

      // sensible defaults
      if (!dateEnd.value) dateEnd.value = dateStart.value || minDate;
      if (!returnDate.value) returnDate.value = dateEnd.value || dateStart.value || minDate;

      // auto-fill return route if empty (swap)
      const from = document.getElementById("from").value || "";
      const to = document.getElementById("to").value || "";
      if (!returnFrom.value && to) returnFrom.value = to;
      if (!returnTo.value && from) returnTo.value = from;
    } else {
      returnFields.style.display = "none";

      returnFrom.required = false;
      returnTo.required = false;
      returnDate.required = false;
      returnTime.required = false;

      // date end still exists but keep it equal to start (one-way)
      dateEndRow.style.display = "none";
      dateEnd.required = false;
      if (dateStart.value) dateEnd.value = dateStart.value;

      // clear return values (optional)
      returnFrom.value = "";
      returnTo.value = "";
      returnDate.value = "";
      returnTime.value = "";
    }
  }

  // init
  setReturnMode(tripType.value === "return");

  tripType.addEventListener("change", () => {
    setReturnMode(tripType.value === "return");
  });
})();
