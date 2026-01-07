/* =========================================================
   Custom Select Dropdowns (non-native)
   - Click to open/close
   - Click option to select
   - Close on outside click / ESC
   - Keyboard: Enter/Space select, Arrow keys navigate
========================================================= */

(function () {
  const selects = Array.from(document.querySelectorAll('.cselect'));

  function closeAll(except) {
    selects.forEach(cs => {
      if (except && cs === except) return;
      cs.classList.remove('open');
      const btn = cs.querySelector('.cselect-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function openSelect(cs) {
    closeAll(cs);
    cs.classList.add('open');
    const btn = cs.querySelector('.cselect-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');

    // focus first option (or selected)
    const list = cs.querySelector('.cselect-list');
    const selected = cs.querySelector('.cselect-option[aria-selected="true"]');
    const first = selected || cs.querySelector('.cselect-option');
    if (list && first) {
      // ensure tabindex
      cs.querySelectorAll('.cselect-option').forEach((opt, i) => {
        opt.tabIndex = (opt === first) ? 0 : -1;
      });
      first.focus();
    }
  }

  function toggleSelect(cs) {
    if (cs.classList.contains('open')) {
      closeAll();
      const btn = cs.querySelector('.cselect-btn');
      if (btn) btn.focus();
    } else {
      openSelect(cs);
    }
  }

  function setValue(cs, optionEl) {
    const value = optionEl.getAttribute('data-value') || optionEl.textContent.trim();
    const label = optionEl.textContent.trim();

    // hidden input
    const input = cs.querySelector('input[type="hidden"]');
    if (input) input.value = value;

    // visible label
    const valueEl = cs.querySelector('.cselect-value');
    if (valueEl) valueEl.textContent = label;

    // aria selected
    cs.querySelectorAll('.cselect-option').forEach(opt => {
      const isSelected = opt === optionEl;
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // close
    closeAll();
    const btn = cs.querySelector('.cselect-btn');
    if (btn) btn.focus();
  }

  // init
  selects.forEach(cs => {
    const btn = cs.querySelector('.cselect-btn');
    const list = cs.querySelector('.cselect-list');
    const options = Array.from(cs.querySelectorAll('.cselect-option'));

    // default aria-selected
    options.forEach((opt, i) => {
      if (!opt.hasAttribute('aria-selected')) opt.setAttribute('aria-selected', 'false');
      opt.tabIndex = (i === 0) ? 0 : -1;
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSelect(cs);
      });

      // keyboard open
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSelect(cs);
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          closeAll();
        }
      });
    }

    // option click
    options.forEach(opt => {
      opt.addEventListener('click', () => setValue(cs, opt));

      opt.addEventListener('keydown', (e) => {
        const currentIndex = options.indexOf(opt);

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setValue(cs, opt);
          return;
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          closeAll();
          const b = cs.querySelector('.cselect-btn');
          if (b) b.focus();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = options[Math.min(currentIndex + 1, options.length - 1)];
          options.forEach(o => o.tabIndex = (o === next ? 0 : -1));
          next.focus();
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = options[Math.max(currentIndex - 1, 0)];
          options.forEach(o => o.tabIndex = (o === prev ? 0 : -1));
          prev.focus();
          return;
        }
      });
    });

    // click on list background does nothing (avoid bubbling surprises)
    if (list) {
      list.addEventListener('mousedown', (e) => e.preventDefault());
    }
  });

  // outside click closes
  document.addEventListener('click', (e) => {
    const target = e.target;
    const inside = target && target.closest && target.closest('.cselect');
    if (!inside) closeAll();
  });

  // ESC closes anywhere
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();
