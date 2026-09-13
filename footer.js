// Sitemap footer, appended to the bottom of every public page. Reuses
// the same page list nav.js already built (via window.BOOST_BOARD_PAGES)
// so there's one list to maintain, not two. Redesigned (v86) to match
// design.css's footer pattern. Load this AFTER nav.js on every page.
(function () {
  const links = window.BOOST_BOARD_PAGES || [];
  if (links.length === 0) return;

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  const footerLinks = links.concat([{ href: './privacy-policy.html', label: 'Privacy Policy' }]);
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="./index.html" aria-label="Boost Board home">Boost Board<span class="dot">.</span></a>
          <p>Daily visibility for fundraisers waiting on their first yes.</p>
        </div>
        <div class="footer-links">
          ${footerLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="footer-year"></span> Boost Board</span>
        <p>Boost Board is a discovery tool, not a fundraiser or payment processor. Visibility doesn't guarantee funding. It's not a charity or nonprofit, and it never touches or processes donations for the campaigns it features.</p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
  document.getElementById('footer-year').textContent = new Date().getFullYear();
})();
