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
    { href: './board.html', label: 'The Board' },
    { href: './how-you-can-help.html', label: 'How You Can Help' },
    { href: './mods.html', label: "Moderators' Picks" },
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
    { href: './about.html', label: 'About' },
    { href: './blog.html', label: 'Blog', alsoActiveFor: ['success-stories.html', 'archive.html'] },
    { href: './overlay-generator.html', label: 'Campaign Tools' },
    { href: './credits.html', label: 'Credits & Support' },
    // "Share Your Page" (v84): moved to the very last slot per request,
    // and given a permanent CTA treatment (`cta: true`) -- always
    // coral-filled like a real button, not just when it happens to be
    // the active page. It's the single most important action on the
    // site, so it gets a different visual weight than a normal nav
    // link, not just a normal-priority position in the list.
    { href: './submit.html', label: 'Share Your Page', cta: true },
    // Reordered + trimmed (v80, v82, v83, v84): "General Archive" and
    // "Success Stories" both dropped from nav, now linked from the Blog
    // page instead (both are written-content pages, same category as
    // the blog itself) -- General Archive being re-approached per the
    // roadmap, Success Stories moved deliberately. "Roadmap" folded
    // into a section on Credits & Support instead of its own page/nav
    // slot. "Share Your Page" moved out of the nav (v80), restored
    // (v83), then moved to last + made a CTA button (v84). The Credits
    // & Support section for it ("Have a campaign of your own?") was
    // left in place too -- two reachable paths to the same form is fine
    // for something this central. None of these pages were deleted --
    // submit.html, archive.html, roadmap.html, and success-stories.html
    // all still exist at their same URLs.
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
    .site-nav a.cta { color: #fff8f4; font-weight: 600; background: #e8562f; }
    .site-nav a.cta:hover { opacity: 0.9; }

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

  // Skip-to-content link -- first focusable element on every page, visually
  // hidden until focused. Targets a zero-size anchor inserted right after
  // nav (see below) rather than requiring every page's HTML to have its
  // own #main id -- this way it works site-wide from one shared file.
  const skipStyle = document.createElement('style');
  skipStyle.textContent = `
    .skip-link {
      position: absolute; top: -60px; left: 12px; z-index: 1000;
      background: #162418; color: #fff8f4; padding: 0.7rem 1.1rem; border-radius: 8px;
      font-family: 'Source Sans 3', sans-serif; font-size: 0.85rem; font-weight: 600;
      text-decoration: none; transition: top 0.15s;
    }
    .skip-link:focus { top: 12px; }
  `;
  document.head.appendChild(skipStyle);

  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = links.map(l => {
    const fileName = l.href.replace('./', '');
    const isActive = fileName === currentPath || (l.alsoActiveFor && l.alsoActiveFor.includes(currentPath));
    const cls = l.cta ? 'cta' : (isActive ? 'active' : '');
    return `<a href="${l.href}" class="${cls}">${l.label}</a>`;
  }).join('');

  document.body.insertBefore(nav, skipLink.nextSibling);

  const mainAnchor = document.createElement('span');
  mainAnchor.id = 'main-content';
  mainAnchor.tabIndex = -1;
  mainAnchor.style.cssText = 'position:absolute; width:1px; height:1px;';
  nav.insertAdjacentElement('afterend', mainAnchor);
})();
