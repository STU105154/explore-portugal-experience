<!-- /assets/js/i18n.js -->
<script>
(() => {
  const SUPPORTED = ["en","pt","es","fr","de","it"];
  const DEFAULT_LANG = "en";

  function normalizeLang(raw) {
    if (!raw) return null;
    const s = String(raw).toLowerCase().trim();
    const primary = s.split("-")[0];
    return SUPPORTED.includes(primary) ? primary : null;
  }

  function getPathLang() {
    // expects /en/... or /pt/... etc
    const parts = location.pathname.split("/").filter(Boolean);
    const first = parts[0] || "";
    return SUPPORTED.includes(first) ? first : null;
  }

  function getStoredLang() {
    return normalizeLang(localStorage.getItem("epe_lang"));
  }

  function storeLang(lang) {
    localStorage.setItem("epe_lang", lang);
  }

  function getBrowserLang() {
    const navLangs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ""];
    for (const l of navLangs) {
      const n = normalizeLang(l);
      if (n) return n;
    }
    return null;
  }

  function getBestLang() {
    return getStoredLang() || getPathLang() || getBrowserLang() || DEFAULT_LANG;
  }

  function isRootIndex() {
    const p = location.pathname;
    return p === "/" || p.endsWith("/index.html") && !getPathLang();
  }

  function goToLang(lang) {
    const targetLang = normalizeLang(lang) || DEFAULT_LANG;

    // keep same page name if possible
    const parts = location.pathname.split("/").filter(Boolean);

    // If currently in /{lang}/page.html -> swap lang only
    if (parts.length && SUPPORTED.includes(parts[0])) {
      parts[0] = targetLang;
      storeLang(targetLang);
      location.href = "/" + parts.join("/") + location.search + location.hash;
      return;
    }

    // If at root (/) or /index.html -> go to /{lang}/index.html
    storeLang(targetLang);
    location.href = "/" + targetLang + "/index.html" + location.search + location.hash;
  }

  // expose small API
  window.EPE_I18N = {
    SUPPORTED,
    DEFAULT_LANG,
    normalizeLang,
    getPathLang,
    getStoredLang,
    getBrowserLang,
    getBestLang,
    goToLang,
    storeLang
  };

  // Root redirect (premium behavior)
  if (isRootIndex()) {
    const best = getBestLang();
    if (!location.pathname.startsWith("/" + best + "/")) {
      location.replace("/" + best + "/index.html");
    }
  }
})();
</script>
