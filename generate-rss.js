#!/usr/bin/env node
// Generates rss.xml from campaigns.json, one item per day: today's
// zero-donation featured campaign (the same one shown as the hero on
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

function daysSinceEpoch(d) {
  return Math.floor(d.getTime() / 86400000);
}

function selectSection(pool, size) {
  const pinned = pool.filter(c => c.pinned);
  const rotatable = pool
    .filter(c => !c.pinned)
    .slice()
    .sort((a, b) => (a.submittedDate || '').localeCompare(b.submittedDate || ''));
  const remainingSlots = Math.max(size - pinned.length, 0);
  const picks = [];
  if (rotatable.length > 0 && remainingSlots > 0) {
    const startIndex = daysSinceEpoch(new Date()) % rotatable.length;
    const n = Math.min(remainingSlots, rotatable.length);
    for (let i = 0; i < n; i++) picks.push(rotatable[(startIndex + i) % rotatable.length]);
  }
  return [...pinned, ...picks].slice(0, size);
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const eligible = campaigns.filter(c => !c.reported && tierOf(c) !== 'graduated');
const pinnedSeed = eligible.filter(c => c.pinned && tierOf(c) === 'seed');
const seedPool = eligible.filter(c => tierOf(c) === 'seed');
const hero = selectSection(pinnedSeed.length ? pinnedSeed : seedPool, 1)[0]
  || selectSection(eligible, 1)[0]
  || null;

const today = new Date().toUTCString();
const item = hero ? `
    <item>
      <title>${escapeXml(hero.name)}</title>
      <link>${escapeXml(hero.link)}</link>
      <guid isPermaLink="false">${escapeXml(hero.id)}-${new Date().toISOString().slice(0, 10)}</guid>
      <pubDate>${today}</pubDate>
      <description>${escapeXml(hero.description)}</description>
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
console.log(hero ? `Wrote rss.xml for: ${hero.name}` : 'No eligible campaign today; wrote empty feed.');
