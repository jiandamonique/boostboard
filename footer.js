// Old-school plain-text sitemap footer, appended to the bottom of every
// public page. Reuses the same page list nav.js already built (via
// window.BOOST_BOARD_PAGES) so there's one list to maintain, not two.
// Load this AFTER nav.js on every page.
(function () {
  const links = window.BOOST_BOARD_PAGES || [];
  if (links.length === 0) return;

  const style = document.createElement('style');
  style.textContent = `
    .site-footer {
      max-width: 640px; margin: 3rem auto 1rem; padding-top: 1rem;
      border-top: 1px solid #ccc; text-align: center;
      font-family: Arial, sans-serif; font-size: 0.78rem; color: #444;
    }
    .site-footer a { color: #0645ad; text-decoration: underline; margin: 0 0.4rem; }
    .site-footer a:visited { color: #551a8b; }
  `;
  document.head.appendChild(style);

  const footer = document.createElement('div');
  footer.className = 'site-footer';
  footer.innerHTML = links.map(l => `<a href="${l.href}">${l.label}</a>`).join(' | ');

  document.body.appendChild(footer);
})();
