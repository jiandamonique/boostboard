#!/usr/bin/env node
// Sends one email to the subscriber audience whenever today's hero
// (zero-donation featured campaign) is DIFFERENT from the last one
// emailed -- prevents duplicate emails if the same campaign stays
// featured across multiple days (e.g. pinned).
//
// Requires two GitHub Secrets, never hardcoded here:
//   RESEND_API_KEY   -- from the Resend dashboard
//   RESEND_AUDIENCE_ID -- the audience/list ID to broadcast to
//
// Subscriber signup itself is NOT handled here -- getting an email
// address INTO the Resend audience in the first place still needs a
// signup form (e.g. embedded on credits.html) and either a manual step
// or a small bridging script to call Resend's "Create Contact" API.
// Not built yet -- see the pre-launch checklist.

const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, 'last-notified.json');
const campaigns = JSON.parse(fs.readFileSync(path.join(__dirname, 'campaigns.json'), 'utf8'));

function tierOf(c) {
  const n = c.donationCount ?? 0;
  if (n === 0) return 'seed';
  if (n <= 4) return 'first_five';
  if (n <= 9) return 'first_ten';
  return 'graduated';
}

function daysSinceEpoch(d) { return Math.floor(d.getTime() / 86400000); }

function selectSection(pool, size) {
  const pinned = pool.filter(c => c.pinned);
  const rotatable = pool.filter(c => !c.pinned).slice()
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

const eligible = campaigns.filter(c => !c.reported && tierOf(c) !== 'graduated');
const pinnedSeed = eligible.filter(c => c.pinned && tierOf(c) === 'seed');
const seedPool = eligible.filter(c => tierOf(c) === 'seed');
const hero = selectSection(pinnedSeed.length ? pinnedSeed : seedPool, 1)[0]
  || selectSection(eligible, 1)[0]
  || null;

if (!hero) {
  console.log('No eligible campaign today -- nothing to send.');
  process.exit(0);
}

let lastNotifiedId = null;
try {
  lastNotifiedId = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')).lastId;
} catch (e) {
  // No state file yet -- first run, treat as "nothing sent before."
}

if (hero.id === lastNotifiedId) {
  console.log(`Already notified about ${hero.name} -- skipping duplicate send.`);
  process.exit(0);
}

async function sendBroadcast() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID -- not sending, exiting.');
    process.exit(1);
  }

  const html = `
    <p>A new campaign at zero donations just got featured on Boost Board:</p>
    <h2>${hero.name}</h2>
    <p>${hero.description}</p>
    <p><a href="${hero.link}">View the campaign →</a></p>
    <p style="color:#888; font-size:0.85em;">You're getting this because you asked to hear
    about zero-donation campaigns specifically -- no other emails, ever.
    <a href="UNSUBSCRIBE_LINK">Unsubscribe</a></p>
  `;

  const res = await fetch('https://api.resend.com/broadcasts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience_id: audienceId,
      subject: `Today's zero: ${hero.name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend API error:', res.status, await res.text());
    process.exit(1);
  }

  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastId: hero.id, sentAt: new Date().toISOString() }, null, 2));
  console.log(`Sent broadcast for: ${hero.name}`);
}

sendBroadcast();
