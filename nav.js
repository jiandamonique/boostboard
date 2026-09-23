// Shared site header/navigation, injected into every page. One file to
// edit instead of duplicating a nav bar into every HTML file. Also
// exposes the full page list on window.BOOST_BOARD_PAGES so footer.js
// can build a complete sitemap without duplicating the list.
(function () {
  const headerLinks = [
    { href: './board.html', label: 'Explore campaigns' },
    { href: './how-it-works.html', label: 'How it works' },
    { href: './about.html', label: 'Our purpose' },
  ];
  const ctaLink = { href: './submit.html', label: 'Share your page', cta: true };

  // Full site list -- everything, including pages not in the header nav.
  // footer.js reads this whole list. Kept in one place so nothing has to
  // be listed twice.
  const allLinks = [
    { href: './index.html', label: 'Boost Board' },
    { href: './board.html', label: 'Explore campaigns' },
    { href: './how-it-works.html', label: 'How it works' },
    { href: './about.html', label: 'Our purpose' },
    { href: './how-you-can-help.html', label: 'How You Can Help' },
    { href: "./mods.html", label: "Moderators' Picks" },
    { href: './resources.html', label: 'Resources', alsoActiveFor: [
      'helpful-fundraising-ideas.html', 'emergency-help.html'
    ] },
    { href: './blog.html', label: 'Blog', alsoActiveFor: ['success-stories.html', 'archive.html', 'blog-common-fundraising-platforms.html', 'how-fundraisers-get-found.html', 'sharing-does-more-than-you-think.html', 'why-boost-board-exists.html', 'amplify-the-campaigns-still-waiting.html', 'labor-day-launch-press-release.html', 'waiting-for-a-first-yes-too.html', 'a-note-for-donors.html', 'blog-helpful-fundraising-ideas.html', 'blog-emergency-mutual-aid-resources.html', 'not-sure-what-to-say-sharing-tools.html', 'compassion-fatigue-and-giving-traditions.html', 'what-mutual-aid-is.html', '13-of-25-progress-on-zero.html', 'still-at-zero-alongside-our-campaigns.html', 'other-ways-people-get-help.html', 'what-the-data-doesnt-tell-you-about-your-goal.html'] },
    { href: './well-on-their-way.html', label: 'Well on Their Way' },
    { href: './overlay-generator.html', label: 'Campaign Tools' },
    { href: './credits.html', label: 'Credits & Support' },
    { href: './submit.html', label: 'Share Your Page', cta: true },
  ];

  window.BOOST_BOARD_PAGES = allLinks;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const style = document.createElement('style');
  style.textContent = `
    .site-header { }
    .site-header .wrap { }
  `;
  document.head.appendChild(style);

  // Skip-to-content link -- first focusable element on every page,
  // visually hidden until focused. Targets a zero-size anchor inserted
  // right after the header (see below) rather than requiring every
  // page's HTML to have its own #main id.
  const skipLink = document.createElement('a');
  skipLink.className = 'skip';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  function isActive(l) {
    const fileName = l.href.replace('./', '');
    return fileName === currentPath || (l.alsoActiveFor && l.alsoActiveFor.includes(currentPath));
  }

  const header = document.createElement('header');
  header.className = 'site-header wrap';
  header.innerHTML = `
    <div class="nav">
      <a class="brand" href="./index.html" aria-label="Boost Board home">
        <svg viewBox="0 0 32 36" fill="none" width="27" height="30" aria-hidden="true"><path d="M5 29V17M15 29V9M25 29V3" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="m19 8 6-6 6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Boost Board<span class="dot">.</span>
      </a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="site-navigation">Menu</button>
      <nav id="site-navigation" class="site-nav" aria-label="Main navigation">
        ${headerLinks.map(l => `<a href="${l.href}"${isActive(l) ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
        <a class="button outline" href="${ctaLink.href}"${isActive(ctaLink) ? ' aria-current="page"' : ''}>${ctaLink.label}
          <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
        </a>
      </nav>
    </div>
  `;

  document.body.insertBefore(header, skipLink.nextSibling);

  const mainAnchor = document.createElement('span');
  mainAnchor.id = 'main-content';
  mainAnchor.tabIndex = -1;
  mainAnchor.style.cssText = 'position:absolute; width:1px; height:1px;';
  header.insertAdjacentElement('afterend', mainAnchor);

  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.site-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      toggle.focus();
    }
  });
})();
