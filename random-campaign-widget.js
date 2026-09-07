// Small, centered "one random campaign" widget appended to the bottom of
// every page (above the footer sitemap). Genuinely random per page load
// -- unlike the hero/board rotation, which is deliberately deterministic
// for fairness, this one is just for incidental exposure, so pure
// Math.random() is fine here. Requires board-data.js to be loaded first.
(function () {
  if (typeof campaigns === 'undefined') return; // board-data.js not loaded on this page

  const eligible = campaigns.filter(c => !c.reported && tierOf(c) !== 'graduated');
  if (eligible.length === 0) return;

  const pick = eligible[Math.floor(Math.random() * eligible.length)];

  const style = document.createElement('style');
  style.textContent = `
    .random-widget {
      max-width: 320px; margin: 2rem auto 0; background: #fff; border: 1px solid rgba(40,80,45,0.18);
      border-radius: 12px; padding: 1rem 1.1rem; box-shadow: 0 4px 24px rgba(22,36,24,0.08);
      text-align: center; font-family: 'Source Sans 3', sans-serif;
    }
    .random-widget .rw-eyebrow {
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; text-transform: uppercase;
      color: #5c6b5c; margin-bottom: 0.4rem; letter-spacing: 0.04em;
    }
    .random-widget .rw-name { font-family: 'Lora', serif; font-size: 0.95rem; margin-bottom: 0.5rem; color: #162418; }
    .random-widget a.rw-link {
      display: inline-block; font-size: 0.78rem; font-weight: 600; color: #162418;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  const widget = document.createElement('div');
  widget.className = 'random-widget';
  widget.innerHTML = `
    <div class="rw-eyebrow">Also on the board</div>
    <div class="rw-name">${pick.name}</div>
    <a class="rw-link" href="${pick.link}" target="_blank" rel="noopener">View campaign →</a>
  `;

  document.body.appendChild(widget);
})();
