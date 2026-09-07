// Sitemap footer, appended to the bottom of every public page. Reuses
// the same page list nav.js already built (via window.BOOST_BOARD_PAGES)
// so there's one list to maintain, not two.
// Load this AFTER nav.js on every page.
(function () {
  const links = window.BOOST_BOARD_PAGES || [];
  if (links.length === 0) return;

  const style = document.createElement('style');
  style.textContent = `
    .site-footer {
      max-width: 640px; margin: 3rem auto 1rem; padding-top: 1.25rem;
      border-top: 1px solid rgba(40,80,45,0.18); text-align: center;
      font-family: 'Source Sans 3', sans-serif; font-size: 0.78rem; color: #5c6b5c;
      line-height: 1.8;
    }
    .site-footer a { color: #5c6b5c; text-decoration: none; margin: 0 0.5rem; }
    .site-footer a:hover { color: #e8562f; text-decoration: underline; }
  `;
  document.head.appendChild(style);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  // Privacy Policy is deliberately footer-only, not in the main nav --
  // conventional placement, and keeps the sidebar from re-bloating
  // after the earlier consolidation into Resources.
  const footerLinks = links.concat([{ href: './privacy-policy.html', label: 'Privacy Policy' }]);
  footer.innerHTML = footerLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join(' | ');

  document.body.appendChild(footer);
})();
