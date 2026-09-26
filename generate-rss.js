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
  return 'rising';
}

// Kept in lockstep with board-data.js's selectSection() and
// notify-subscribers.js so all three always pick the same spotlight.
// Uses the same deterministic daily-offset rotation so the RSS item
// agrees with what index.html shows even when lastFeatured dates tie.
function todayOffset() {
  const epoch = new Date('2026-01-01T00:00:00Z');
  return Math.floor((Date.now() - epoch) / 86400000);
}

function isPinned(c) {
  if (!c.pinned) return false;
  if (!c.pinnedUntil) return true;
  const todayStr = new Date().toISOString().slice(0, 10);
  return todayStr <= c.pinnedUntil;
}

function selectSection(pool, size) {
  const pinned = pool.filter(c => isPinned(c));
  const rotatable = pool
    .filter(c => !isPinned(c))
    .slice()
    .sort((a, b) => {
      const aKey = a.lastFeatured || '';
      const bKey = b.lastFeatured || '';
      if (aKey !== bKey) return aKey.localeCompare(bKey);
      return (a.submittedDate || '').localeCompare(b.submittedDate || '');
    });
  const remainingSlots = Math.max(size - pinned.length, 0);
  const offset = rotatable.length > 0 ? todayOffset() % rotatable.length : 0;
  const rotated = [...rotatable.slice(offset), ...rotatable.slice(0, offset)];
  const picks = rotated.slice(0, remainingSlots);
  return [...pinned, ...picks].slice(0, size);
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const eligible = campaigns.filter(c => !c.reported && tierOf(c) !== 'rising');
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
    <title>Boost Board — Early-stage campaigns. Be their first yes.</title>
    <link>https://jiandamonique.github.io/boostboard/</link>
    <description>One spotlight per day: a campaign still finding its people. No donors yet, or not many. Be the first one.</description>
    <lastBuildDate>${today}</lastBuildDate>${item}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), rss);
console.log(spotlight ? `Wrote rss.xml for: ${spotlight.name}` : 'No eligible campaign today; wrote empty feed.');
