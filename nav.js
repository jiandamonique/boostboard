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
    // Coalesced (v64): was three separate top-level links (Helpful
    // Fundraising Ideas, Fundraising Platforms, Emergency & Mutual Aid
    // Help) -- now one entry pointing to resources.html, which links out
    // to all three. Those three pages still exist at their same URLs for
    // anyone with an existing direct link (submit.html, board.html, and
    // the README all still link to helpful-fundraising-ideas.html
    // directly) -- only the nav itself got shorter. `alsoActiveFor`
    // keeps this link highlighted when someone's actually on one of the
    // three sub-pages, even though none of them are in `links` anymore.
    { href: './resources.html', label: 'Resources', alsoActiveFor: [
      'helpful-fundraising-ideas.html', 'emergency-help.html'
    ] },
    { href: './overlay-generator.html', label: 'Campaign Tools' },
    { href: './blog.html', label: 'Blog' },
    { href: './mods.html', label: "Moderators' Picks" },
    { href: './credits.html', label: 'Credits & Support' },
  ];

  window.BOOST_BOARD_PAGES = links;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const SIDEBAR_WIDTH = '220px';
  const BREAKPOINT = '700px';
  const PAGE_MAX = '1400px';

  const style = document.createElement('style');
  style.textContent = `
    .site-nav {
      display: flex; gap: 0.4rem; overflow-x: auto; -webkit-overflow-scrolling: touch;
      max-width: 640px; margin: 0 auto 2rem; padding: 0.6rem 0.75rem;
      font-family: 'Source Sans 3', sans-serif; font-size: 0.82rem;
      background: #fff; border: 1px solid rgba(40,80,45,0.18); border-radius: 999px;
      box-shadow: 0 2px 10px rgba(22,36,24,0.06); scrollbar-width: none;
    }
    .site-nav::-webkit-scrollbar { display: none; }
    .site-nav a {
      color: #5c6b5c; text-decoration: none; white-space: nowrap; flex-shrink: 0;
      padding: 0.42rem 0.85rem; border-radius: 999px; font-weight: 500;
    }
    .site-nav a.active { color: #fff8f4; font-weight: 600; background: #e8562f; }
    .site-nav a:hover:not(.active) { background: #f2f7f2; color: #162418; }

    @media (min-width: ${BREAKPOINT}) {
      /* Page-max keeps the sidebar+content pair centered as one unit on
         very wide screens, instead of pinning the sidebar to the true
         viewport edge forever (which is what left the huge dead margin
         on the right on wide monitors). Below PAGE_MAX width, the
         max()/calc() below both evaluate to 0, so behavior is identical
         to before -- this only changes anything once the screen is
         wider than the page actually wants to be. */
      body {
        padding-left: calc(max(0px, (100vw - ${PAGE_MAX}) / 2) + ${SIDEBAR_WIDTH} + 1.5rem);
        padding-right: max(1.5rem, calc((100vw - ${PAGE_MAX}) / 2));
        box-sizing: border-box;
      }

      .site-nav {
        position: fixed; top: 0; left: max(0px, calc((100vw - ${PAGE_MAX}) / 2));
        height: 100vh; width: ${SIDEBAR_WIDTH};
        flex-direction: column; justify-content: flex-start; align-items: stretch;
        gap: 0.2rem; max-width: none; margin: 0; padding: 1.75rem 1.25rem;
        background: #fff; border: none; border-right: 1px solid rgba(40,80,45,0.18);
        border-radius: 0; overflow-y: auto; overflow-x: visible; box-sizing: border-box;
        box-shadow: none;
      }
      .site-nav a {
        padding: 0.55rem 0.6rem; border-radius: 8px; line-height: 1.3; white-space: normal;
      }
      .site-nav a.active {
        background: #e6efe6; color: #162418; border-left: 3px solid #6b9e8a;
        padding-left: calc(0.6rem - 3px);
      }
      .site-nav a:hover:not(.active) { background: #f2f7f2; color: #162418; }
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = links.map(l => {
    const fileName = l.href.replace('./', '');
    const isActive = fileName === currentPath || (l.alsoActiveFor && l.alsoActiveFor.includes(currentPath));
    return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
  }).join('');

  document.body.insertBefore(nav, document.body.firstChild);
})();
