// generate-rss.js
// Reads today's campaign spotlight from daily-spotlight.json (written by
// mark-featured.js earlier in the same workflow run) and writes rss.xml.
//
// IMPORTANT: This script must run AFTER mark-featured.js in the workflow
// so both use the exact same campaign. Do not call this standalone --
// daily-spotlight.json won't exist (or will be stale from a previous run).
//
// rss.xml stays as a single-item feed: one spotlight per day.

'use strict';

const fs = require('fs');
const path = require('path');

const SPOTLIGHT_FILE = path.join(__dirname, 'daily-spotlight.json');
const RSS_FILE = path.join(__dirname, 'rss.xml');
const BASE_URL = 'https://jiandamonique.github.io/boostboard/';

// Read the spotlight written by mark-featured.js
let spotlight;
try {
  spotlight = JSON.parse(fs.readFileSync(SPOTLIGHT_FILE, 'utf8'));
} catch (e) {
  console.error('Could not read daily-spotlight.json:', e.message);
  console.error('Run mark-featured.js before this script.');
  process.exit(1);
}

if (!spotlight) {
  console.log('No eligible spotlight in daily-spotlight.json. rss.xml not updated.');
  process.exit(0);
}

function esc(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const pubDate = new Date().toUTCString();
const guid = `${spotlight.id}-${spotlight.date}`;
const name = esc(spotlight.name);
const description = esc(spotlight.description || spotlight.name || '');
const link = spotlight.link || BASE_URL;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Boost Board — Early-stage campaigns. Be their first yes.</title>
    <link>${BASE_URL}</link>
    <description>One spotlight per day: a campaign still finding its people. No donors yet, or not many. Be the first one.</description>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <item>
      <title>${name}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>
  </channel>
</rss>
`;

fs.writeFileSync(RSS_FILE, xml, 'utf8');
console.log(`RSS updated: ${spotlight.id} — ${spotlight.name}`);
