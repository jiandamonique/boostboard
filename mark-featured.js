#!/usr/bin/env node
// Stamps lastFeatured on today's spotlight (and zero/TLC section picks)
// in BOTH campaigns.json and board-data.js, then writes both files back.
//
// Both, because index.html and board.html only ever load board-data.js
// (a hardcoded copy of the same array) -- campaigns.json is what the
// private repo's scripts fetch over the network. Writing only one would
// silently desync the two and this script would look like it worked
// while doing nothing for the actual live site. See the project's
// standing dual-file-sync rule: these two must always match exactly.
//
// Why this exists: board-data.js's selectSection() now orders campaigns
// by lastFeatured (oldest/never-featured first) instead of a pool-size-
// dependent index, so that a campaign can't repeat before every other
// eligible campaign has had a turn -- see board-data.js for the full
// story on why the old date-modulo approach didn't actually guarantee
// that. But that only works if lastFeatured is kept current: something
// has to record "this campaign was shown today" after each day's pick
// is made. A static site has no server to do that at view time, so this
// script does it once a day instead, via the workflow below.
//
// This is safe to automate on a schedule (see the automation-boundary
// note in INTERNAL_decisions-chronolog.md): it recomputes an
// already-deterministic, already-public selection and stamps a
// bookkeeping date field -- it adds no new campaign, changes no
// donation numbers, and makes no moderation judgment call. It commits
// using the GitHub Actions run's own default GITHUB_TOKEN, scoped only
// to this repo for the life of the job -- no new secret, no new
// credential, nothing that needs storing.
//
// Kept in its own file (not folded into generate-rss.js) so it's
// obvious at a glance that this is the one script in the public repo
// that writes back to campaigns.json, and so it's easy to audit on its
// own.

const fs = require('fs');
const path = require('path');

const CAMPAIGNS_FILE = path.join(__dirname, 'campaigns.json');
const BOARD_DATA_FILE = path.join(__dirname, 'board-data.js');
const METRICS_LOG_FILE = path.join(__dirname, 'metrics-log.json');
const ZERO_SECTION_SIZE = 15;
const TLC_SECTION_SIZE = 10;

function tierOf(c) {
  const n = c.donationCount ?? 0;
  if (n === 0) return 'seed';
  if (n <= 4) return 'first_five';
  if (n <= 9) return 'first_ten';
  return 'graduated';
}

function percentOfGoal(c) {
  if (!c.goalAmount || c.goalAmount <= 0 || c.amountRaised == null) return null;
  return (c.amountRaised / c.goalAmount) * 100;
}

function qualifiesAsFallback(c) {
  const pct = percentOfGoal(c);
  return (pct !== null && pct < 10) || c.lowEngagementFlag === true;
}

function isPinned(c) {
  if (!c.pinned) return false;
  if (!c.pinnedUntil) return true;
  const todayStr = new Date().toISOString().slice(0, 10);
  return todayStr <= c.pinnedUntil;
}

// Identical to board-data.js's selectSection() -- keep both in sync.
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
  const picks = rotatable.slice(0, remainingSlots);
  return [...pinned, ...picks].slice(0, size);
}

function tierOf_local(c) {
  const n = c.donationCount ?? 0;
  if (n === 0) return 'seed';
  if (n <= 4) return 'first_five';
  if (n <= 9) return 'first_ten';
  return 'graduated';
}

// Load or create the metrics log. Structure:
// { "firstDonorEvents": [...], "graduationEvents": [...] }
// Each event: { "date": "YYYY-MM-DD", "campaignId": "cXXX", "campaignName": "...", "note": "..." }
function loadMetricsLog() {
  try {
    return JSON.parse(fs.readFileSync(METRICS_LOG_FILE, 'utf8'));
  } catch (e) {
    return { firstDonorEvents: [], graduationEvents: [] };
  }
}

// Compare campaign states before and after daily stamping to capture
// milestone crossings: 0→1 (first donor) and any→graduated (10+).
// Takes the raw campaigns array BEFORE lastFeatured is written (so
// donationCount reflects today's live data as uploaded, not yesterday).
function detectAndLogMilestones(campaigns, metricsLog) {
  const today = new Date().toISOString().slice(0, 10);
  let newEvents = 0;

  // Build a quick lookup of already-logged campaign+event pairs so we
  // don't double-log the same milestone if the script runs twice.
  const loggedFirstDonor = new Set(metricsLog.firstDonorEvents.map(e => e.campaignId));
  const loggedGraduation = new Set(metricsLog.graduationEvents.map(e => e.campaignId));

  for (const c of campaigns) {
    const tier = tierOf_local(c);
    const count = c.donationCount ?? 0;

    // First donor: campaign is in first_five tier (1–4 donors) and hasn't
    // been logged as having received its first donor yet.
    if (tier === 'first_five' && !loggedFirstDonor.has(c.id)) {
      metricsLog.firstDonorEvents.push({
        date: today,
        campaignId: c.id,
        campaignName: c.name,
        note: `First donor recorded (donationCount: ${count})`
      });
      loggedFirstDonor.add(c.id);
      newEvents++;
      console.log(`  Milestone: ${c.name} got its first donor.`);
    }

    // Graduated: 10+ donors and not yet logged.
    if (tier === 'graduated' && !loggedGraduation.has(c.id)) {
      metricsLog.graduationEvents.push({
        date: today,
        campaignId: c.id,
        campaignName: c.name,
        note: `Graduated off active board (donationCount: ${count}, amountRaised: ${c.amountRaised ?? 'n/a'})`
      });
      loggedGraduation.add(c.id);
      newEvents++;
      console.log(`  Milestone: ${c.name} graduated (${count} donors).`);
    }
  }

  return newEvents;
}

function main() {
  const campaigns = JSON.parse(fs.readFileSync(CAMPAIGNS_FILE, 'utf8'));

  const eligible = campaigns.filter(c =>
    !c.reported && (tierOf(c) !== 'graduated' || qualifiesAsFallback(c))
  );
  const pinnedAny = eligible.filter(c => isPinned(c));
  const seedPool = eligible.filter(c => tierOf(c) === 'seed');
  const spotlight = selectSection(pinnedAny.length ? pinnedAny : seedPool, 1)[0]
    || selectSection(eligible, 1)[0]
    || null;

  const spotlightId = spotlight ? spotlight.id : null;
  const zeroPool = eligible.filter(c => tierOf(c) === 'seed' && c.id !== spotlightId);
  const zeroSection = selectSection(zeroPool, ZERO_SECTION_SIZE);
  const tlcPool = eligible.filter(c => tierOf(c) !== 'seed' && c.id !== spotlightId);
  const tlcSection = selectSection(tlcPool, TLC_SECTION_SIZE);

  // Detect and log milestones BEFORE writing files (donationCount is current)
  const metricsLog = loadMetricsLog();
  const newMilestones = detectAndLogMilestones(campaigns, metricsLog);
  if (newMilestones > 0) {
    fs.writeFileSync(METRICS_LOG_FILE, JSON.stringify(metricsLog, null, 2) + '\n');
    console.log(`Logged ${newMilestones} new milestone event(s) to metrics-log.json.`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const featuredIds = new Set([
    ...(spotlight ? [spotlight.id] : []),
    ...zeroSection.map(c => c.id),
    ...tlcSection.map(c => c.id),
  ]);

  let changed = 0;
  for (const c of campaigns) {
    if (featuredIds.has(c.id) && c.lastFeatured !== today) {
      c.lastFeatured = today;
      changed++;
    }
  }

  if (changed === 0) {
    console.log('No lastFeatured updates needed today.');
    return;
  }

  // Build both files' new contents before writing either one, so a
  // problem with board-data.js's format can never leave the two files
  // disagreeing (campaigns.json written, board-data.js silently stale).
  const boardDataSrc = fs.readFileSync(BOARD_DATA_FILE, 'utf8');
  const newDecl = `const campaigns = ${JSON.stringify(campaigns, null, 2)};`;
  const updatedBoardData = boardDataSrc.replace(/const campaigns = \[[\s\S]*?\n\];/, newDecl);
  if (updatedBoardData === boardDataSrc) {
    console.error('Could not find the campaigns array in board-data.js -- aborting without writing either file.');
    process.exit(1);
  }

  fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2) + '\n');
  fs.writeFileSync(BOARD_DATA_FILE, updatedBoardData);

  console.log(`Stamped lastFeatured=${today} on ${changed} campaign(s). Updated campaigns.json and board-data.js.`);
}

main();
