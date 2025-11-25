<!-- GOOGLE TRANSLATE -->
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'pt',
      includedLanguages: 'en,pt,es,fr,de',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }
</script>

<script type="text/javascript"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>

<!-- NAV MOBILE (HAMBÚRGUER) -->
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggle && navMenu) {
      toggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-menu-open');
      });

      // fechar menu ao clicar num link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('nav-menu-open');
        });
      });
    }
  });
</script>
</body>
</html>
