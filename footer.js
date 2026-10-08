// Sitemap footer, appended to the bottom of every public page. Reuses
// the same page list nav.js already built (via window.BOOST_BOARD_PAGES)
// so there's one list to maintain, not two. Load this AFTER nav.js on
// every page.
(function () {
  const links = window.BOOST_BOARD_PAGES || [];
  if (links.length === 0) return;

  // Blog posts get an extra bold, centered link back to the homepage
  // right after the post content -- distinct from the sitemap footer
  // below, which reads as generic site chrome by the time someone
  // reaches it. Detected via .post-body, used only by actual posts.
  const postBody = document.querySelector('.post-body');
  if (postBody) {
    // Support CTA — injected on every blog post, never touches individual post files
    const supportBlock = document.createElement('div');
    supportBlock.style.cssText = 'margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--line);';
    supportBlock.innerHTML = `
      <p style="font-size:0.85rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem;">Support Boost Board</p>
      <p style="font-size:0.95rem; margin-bottom:1rem;">Boost Board runs on volunteer time. If this was worth a few minutes of yours, a small contribution keeps the board running.</p>
      <a href="https://www.gofundme.com/f/amplify-campaigns-waiting-for-a-first-yes" target="_blank" rel="noopener" class="button" style="display:inline-flex;font-size:0.9rem;padding:10px 22px;gap:10px;">Support on GoFundMe <svg viewBox="0 0 24 24" aria-hidden="true" style="width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.7;flex-shrink:0;"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>`;
    postBody.appendChild(supportBlock);

    const homeLink = document.createElement('p');
    homeLink.style.cssText = 'text-align:center; margin-top:32px; font-size:17px;';
    homeLink.innerHTML = '<a href="./index.html" style="font-weight:700; text-decoration:underline; color:var(--deep);">Boost Board</a>';
    postBody.appendChild(homeLink);
  }

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  const footerLinks = links.concat([
    { href: './terms.html', label: 'Terms' },
  ]);
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
        <span>© <span id="footer-year"></span> Boost Board. A little attention tips the balance.</span>
        <p>Boost Board is a discovery tool, not a charity, nonprofit, or payment processor. It never touches donations or guarantees funding. Every campaign — including our volunteers' or their family's — is independent, with no funds ever delegated to us.</p>
        <p style="margin-top:0.6rem;font-style:italic;font-size:0.75rem;color:#9ca3af;"><a href="https://jiandamonique.github.io/" target="_blank" rel="noopener" style="color:#9ca3af;text-decoration:none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">(site editor: @jiandamonique)</a></p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
  document.getElementById('footer-year').textContent = new Date().getFullYear();
})();
