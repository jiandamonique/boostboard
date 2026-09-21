#!/usr/bin/env node
// Generates rss.xml from campaigns.json, one item per day: today's
// zero-donation featured campaign (the same one shown as the spotlight on
// index.html). Meant to run once a day via a scheduled GitHub Action --
// safe to automate because it only recomputes an already-approved
// rotation deterministically, the same way the client-side JS does. It
// makes no moderation decision and adds no new campaign to the site.
const fs = require('fs');
const path = require('path');

const campaigns = JSON.parse(fs.readFileSync(path.join(__dirname, 'campaigns.json'), 'utf8'));

function tierOf(c) {
  const n = c.donationCount ?? 0;
  if (n === 0) return 'seed';
  if (n <= 4) return 'first_five';
  if (n <= 9) return 'first_ten';
  return 'graduated';
}

// Kept identical to board-data.js's selectSection() -- ordering by
// lastFeatured (not a pool-size-dependent index) so this always agrees
// with what index.html actually shows, regardless of how the pool's
// size has changed since yesterday. See board-data.js for the full
// reasoning; this file and notify-subscribers.js (private repo) both
// need to stay in lockstep with it since they're all picking "today's
// hero" independently from the same data.
function selectSection(pool, size) {
  const pinned = pool.filter(c => c.pinned);
  const rotatable = pool
    .filter(c => !c.pinned)
    .slice()
    .sort((a, b) => {
      const aKey = a.lastFeatured || '';
      const bKey = b.lastFeatured || '';
      if (aKey !== bKey) return aKey.localeCompare(bKey);
      return (a.submittedDate || '').localeCompare(b.submittedDate || '');
    });
  const remainingSlots = Math.max(size - pinned.length, 0);
  const picks = rotatable.slice(0, remainingSlots);
  return [...pinned, ...picks].slice(0, size);
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const eligible = campaigns.filter(c => !c.reported && tierOf(c) !== 'graduated');
const pinnedSeed = eligible.filter(c => c.pinned && tierOf(c) === 'seed');
const seedPool = eligible.filter(c => tierOf(c) === 'seed');
const spotlight = selectSection(pinnedSeed.length ? pinnedSeed : seedPool, 1)[0]
  || selectSection(eligible, 1)[0]
  || null;

const today = new Date().toUTCString();
const item = spotlight ? `
    <item>
      <title>${escapeXml(spotlight.name)}</title>
      <link>${escapeXml(spotlight.link)}</link>
      <guid isPermaLink="false">${escapeXml(spotlight.id)}-${new Date().toISOString().slice(0, 10)}</guid>
      <pubDate>${today}</pubDate>
      <description>${escapeXml(spotlight.description)}</description>
    </item>` : '';

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Boost Board — Today's Zero</title>
    <link>https://example.org/index.html</link>
    <description>One email whenever a campaign at zero donations gets featured. Nothing else.</description>
    <lastBuildDate>${today}</lastBuildDate>${item}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), rss);
console.log(spotlight ? `Wrote rss.xml for: ${spotlight.name}` : 'No eligible campaign today; wrote empty feed.');
