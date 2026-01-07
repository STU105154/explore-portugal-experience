/* =========================================================
   Custom Select Dropdowns (non-native)
   - Click to open/close
   - Click option to select
   - Close on outside click / ESC
   - Keyboard: Enter/Space select, Arrow keys navigate
   - Supports separators: .cselect-sep (non-selectable)
========================================================= */

(function () {
  const selects = Array.from(document.querySelectorAll('.cselect'));

  function isSelectable(el) {
    if (!el) return false;
    if (el.classList.contains('cselect-sep')) return false;
    if (el.getAttribute('data-disabled') === 'true') return false;
    return el.classList.contains('cselect-option');
  }

  function getSelectableOptions(cs) {
    return Array.from(cs.querySelectorAll('.cselect-option')).filter(isSelectable);
  }

  function closeAll(except) {
    selects.forEach(cs => {
      if (except && cs === except) return;
      cs.classList.remove('open');
      const btn = cs.querySelector('.cselect-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function focusOption(options, index) {
    if (!options.length) return;
    const i = Math.max(0, Math.min(index, options.length - 1));
    options.forEach((opt, idx) => opt.tabIndex = (idx === i ? 0 : -1));
    options[i].focus();
  }

  function openSelect(cs) {
    closeAll(cs);
    cs.classList.add('open');
    const btn = cs.querySelector('.cselect-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');

    const options = getSelectableOptions(cs);
    const selected = options.find(o => o.getAttribute('aria-selected') === 'true');
    const first = selected || options[0];
    if (first) focusOption(options, options.indexOf(first));
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
    if (!isSelectable(optionEl)) return;

    const value = optionEl.getAttribute('data-value') || optionEl.textContent.trim();
    const label = optionEl.textContent.trim();

    const input = cs.querySelector('input[type="hidden"]');
    if (input) input.value = value;

    const valueEl = cs.querySelector('.cselect-value');
    if (valueEl) valueEl.textContent = label;

    cs.querySelectorAll('.cselect-option').forEach(opt => {
      opt.setAttribute('aria-selected', opt === optionEl ? 'true' : 'false');
    });

    closeAll();
    const btn = cs.querySelector('.cselect-btn');
    if (btn) btn.focus();
  }

  // init
  selects.forEach(cs => {
    const btn = cs.querySelector('.cselect-btn');
    const list = cs.querySelector('.cselect-list');
    const options = getSelectableOptions(cs);

    // default aria-selected
    options.forEach((opt) => {
      if (!opt.hasAttribute('aria-selected')) opt.setAttribute('aria-selected', 'false');
      opt.tabIndex = -1;
    });
    if (options[0]) options[0].tabIndex = 0;

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSelect(cs);
      });

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

    // click select
    cs.addEventListener('click', (e) => {
      const opt = e.target.closest('.cselect-option');
      if (!opt) return;
      setValue(cs, opt);
    });

    // keyboard in list
    cs.addEventListener('keydown', (e) => {
      if (!cs.classList.contains('open')) return;

      const optionsNow = getSelectableOptions(cs);
      const current = document.activeElement;
      const idx = optionsNow.indexOf(current);

      if (e.key === 'Escape') {
        e.preventDefault();
        closeAll();
        const b = cs.querySelector('.cselect-btn');
        if (b) b.focus();
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        if (isSelectable(current)) {
          e.preventDefault();
          setValue(cs, current);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusOption(optionsNow, idx < 0 ? 0 : idx + 1);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusOption(optionsNow, idx < 0 ? 0 : idx - 1);
        return;
      }
    });

    // avoid drag focus weirdness
    if (list) list.addEventListener('mousedown', (e) => e.preventDefault());
  });

  // outside click closes
  document.addEventListener('click', (e) => {
    const inside = e.target.closest && e.target.closest('.cselect');
    if (!inside) closeAll();
  });

  // ESC closes anywhere
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();
