// Shared site navigation, injected into every page. One file to edit
// instead of duplicating a nav bar into every HTML file. Also exposes the
// page list on window.BOOST_BOARD_PAGES so footer.js can reuse the same
// list for the bottom-of-page sitemap without duplicating it.
//
// Layout: a fixed left-hand panel on wider screens (matches how the rest
// of the site is styled), collapsing to the original horizontal top bar
// on narrow screens, since a 220px fixed sidebar leaves too little room
// on a phone-width viewport.
(function () {
  const links = [
    { href: './index.html', label: 'Boost Board' },
    { href: './submit.html', label: 'Share Your Page' },
    { href: './board.html', label: 'The Board' },
    { href: './about.html', label: 'About' },
    { href: './success-stories.html', label: 'Success Stories' },
    { href: './archive.html', label: 'General Archive' },
    { href: './roadmap.html', label: 'Roadmap' },
    { href: './helpful-fundraising-ideas.html', label: 'Helpful Fundraising Ideas' },
    { href: './overlay-generator.html', label: 'Campaign Tools' },
    { href: './fundraising-platforms.html', label: 'Fundraising Platforms' },
    { href: './emergency-help.html', label: 'Emergency & Mutual Aid Help' },
    { href: './blog.html', label: 'Blog' },
    { href: './mods.html', label: "Moderators' Picks" },
    { href: './credits.html', label: 'Credits & Support' },
  ];

  window.BOOST_BOARD_PAGES = links;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const SIDEBAR_WIDTH = '220px';
  const BREAKPOINT = '700px';

  const style = document.createElement('style');
  style.textContent = `
    .site-nav {
      display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
      max-width: 640px; margin: 0 auto 2rem;
      font-family: 'Source Sans 3', sans-serif; font-size: 0.85rem;
    }
    .site-nav a { color: #5c6b5c; text-decoration: none; padding: 0.3rem 0; }
    .site-nav a.active { color: #162418; font-weight: 600; border-bottom: 2px solid #6b9e8a; }
    .site-nav a:hover { color: #162418; }

    @media (min-width: ${BREAKPOINT}) {
      body { padding-left: calc(${SIDEBAR_WIDTH} + 1.5rem); }

      .site-nav {
        position: fixed; top: 0; left: 0; height: 100vh; width: ${SIDEBAR_WIDTH};
        flex-direction: column; justify-content: flex-start; align-items: stretch;
        gap: 0.2rem; max-width: none; margin: 0; padding: 1.75rem 1.25rem;
        background: #fff; border-right: 1px solid rgba(40,80,45,0.18);
        overflow-y: auto; box-sizing: border-box;
      }
      .site-nav a {
        padding: 0.55rem 0.6rem; border-radius: 8px; line-height: 1.3;
      }
      .site-nav a.active {
        background: #e6efe6; border-bottom: none; border-left: 3px solid #6b9e8a;
        padding-left: calc(0.6rem - 3px);
      }
      .site-nav a:hover { background: #f2f7f2; }
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = links.map(l => {
    const fileName = l.href.replace('./', '');
    const isActive = fileName === currentPath;
    return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
  }).join('');

  document.body.insertBefore(nav, document.body.firstChild);
})();
