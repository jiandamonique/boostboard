// Shared campaign data + selection logic, used by both index.html (the
// simple landing page) and board.html (the full rotating board). One
// source of truth instead of duplicating the dataset and tier/rotation
// math across two pages.
const campaigns = [
  {
    "id": "c001",
    "name": "Maren's surgery fund",
    "communities": [
      "autistic",
      "disabled"
    ],
    "description": "Emergency surgery costs after insurance denial.",
    "link": "https://gofundme.com/f/example-maren",
    "donationCount": 0,
    "submittedDate": "2026-08-20",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c002",
    "name": "Jae's housing deposit",
    "communities": [
      "trans",
      "lgbtqia"
    ],
    "description": "First/last month deposit after leaving an unsafe living situation.",
    "link": "https://gofundme.com/f/example-jae",
    "donationCount": 2,
    "submittedDate": "2026-08-22",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c003",
    "name": "Ruth's mobility van repair",
    "communities": [
      "disabled",
      "elderly"
    ],
    "description": "Wheelchair-accessible van needs transmission work.",
    "link": "https://gofundme.com/f/example-ruth",
    "donationCount": 7,
    "submittedDate": "2026-08-25",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c004",
    "name": "Priya's legal name change costs",
    "communities": [
      "trans",
      "lgbtqia"
    ],
    "description": "Court and filing fees for legal name/gender marker change.",
    "link": "https://gofundme.com/f/example-priya",
    "donationCount": 14,
    "submittedDate": "2026-08-18",
    "lastFeatured": "2026-09-01",
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c005",
    "name": "Diego's wheelchair repair",
    "communities": [
      "disabled"
    ],
    "description": "Custom wheelchair part replacement, insurance denied as cosmetic.",
    "link": "https://gofundme.com/f/example-diego",
    "donationCount": 0,
    "submittedDate": "2026-08-28",
    "lastFeatured": null,
    "pinned": true,
    "reported": false,
    "imageUrl": "",
    "pinReason": "Surgery date is next week and this hasn't moved yet.",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c006",
    "name": "Alex's top surgery aftercare",
    "communities": [
      "trans"
    ],
    "description": "Post-op supplies and follow-up appointments not covered by insurance.",
    "link": "https://gofundme.com/f/example-alex",
    "donationCount": 3,
    "submittedDate": "2026-08-29",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c007",
    "name": "Community elder relocation",
    "communities": [
      "elderly",
      "lgbtqia"
    ],
    "description": "Moving costs after assisted living facility closure.",
    "link": "https://gofundme.com/f/example-elder",
    "donationCount": 1,
    "submittedDate": "2026-08-30",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false
  },
  {
    "id": "c008",
    "name": "Rosa's wheelchair-accessible home repair",
    "communities": [
      "disabled",
      "elderly"
    ],
    "description": "Ramp and bathroom modifications after a fall; contractor quote came in high.",
    "link": "https://gofundme.com/f/example-rosa",
    "donationCount": 12,
    "amountRaised": 300,
    "goalAmount": 20000,
    "lowEngagementFlag": false,
    "submittedDate": "2026-08-15",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": ""
  }
];

const TLC_SECTION_SIZE = 10;
const ZERO_SECTION_SIZE = 15;

function tierOf(c) {
  const n = c.donationCount ?? 0;
  if (n === 0) return 'seed';
  if (n <= 4) return 'first_five';
  if (n <= 9) return 'first_ten';
  return 'graduated';
}

// Percentage of goal reached, if both amountRaised and goalAmount are
// known. Returns null if either is missing (both are optional/self-
// reported fields -- most campaigns won't have them).
function percentOfGoal(c) {
  if (!c.goalAmount || c.goalAmount <= 0 || c.amountRaised == null) return null;
  return (c.amountRaised / c.goalAmount) * 100;
}

const LOW_PERCENTAGE_THRESHOLD = 10; // percent

// Fallback eligibility: a campaign that's technically "graduated" by
// donor count (10+ donors) can still desperately need help if it's
// barely dented its dollar goal, or if a moderator has flagged it as
// low-engagement (few shares/views -- something no platform API exposes,
// so this is always a manual judgment call, never computed). This exists
// specifically for when the normal seed/first-five/first-ten pool runs
// thin -- it's a supplement, not a replacement for the donor-count tiers.
function qualifiesAsFallback(c) {
  const pct = percentOfGoal(c);
  const lowPercentage = pct !== null && pct < LOW_PERCENTAGE_THRESHOLD;
  return lowPercentage || c.lowEngagementFlag === true;
}

function tierLabel(key) {
  return { seed: 'Seed · 0 donors', first_five: 'First Five · 1–4 donors', first_ten: 'First Ten · 5–9 donors' }[key] || '';
}

// Label for a fallback-eligible campaign (10+ donors but still
// qualifies via low percent-of-goal or a flagged low-engagement note).
// Transparent about *why* it's here, since it's outside the normal
// donor-count tiers -- a visitor seeing "Graduated" with no explanation
// next to a campaign that's clearly still struggling would be confusing.
function fallbackLabel(c) {
  const pct = percentOfGoal(c);
  if (pct !== null && pct < LOW_PERCENTAGE_THRESHOLD) {
    return `${Math.round(pct)}% of goal reached`;
  }
  if (c.lowEngagementFlag) return 'Low engagement — added manually';
  return 'Added manually';
}

function daysSinceEpoch(d) {
  return Math.floor(d.getTime() / 86400000);
}

// Shared selector: pinned entries in the pool always get a slot, everyone
// else rotates through automatically via a date-seeded queue position, so
// the whole pool cycles before repeats -- no manual step or server needed.
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
    for (let i = 0; i < n; i++) {
      picks.push(rotatable[(startIndex + i) % rotatable.length]);
    }
  }
  return [...pinned, ...picks].slice(0, size);
}

// Computes today's hero, zero-donation section, and TLC section from the
// shared dataset. Both pages call this once and render whatever piece
// they need -- index.html just the hero, board.html just the sections.
function computeToday() {
  const eligible = campaigns.filter(c =>
    !c.reported && (tierOf(c) !== 'graduated' || qualifiesAsFallback(c))
  );

  const pinnedSeed = eligible.filter(c => c.pinned && tierOf(c) === 'seed');
  const seedPool = eligible.filter(c => tierOf(c) === 'seed');
  const hero = selectSection(pinnedSeed.length ? pinnedSeed : seedPool, 1)[0]
    || selectSection(eligible, 1)[0]
    || null;

  const heroId = hero ? hero.id : null;
  const zeroPool = eligible.filter(c => tierOf(c) === 'seed' && c.id !== heroId);
  const zeroSection = selectSection(zeroPool, ZERO_SECTION_SIZE);
  const tlcPool = eligible.filter(c => tierOf(c) !== 'seed' && c.id !== heroId);
  const tlcSection = selectSection(tlcPool, TLC_SECTION_SIZE);

  return { hero, zeroSection, tlcSection };
}
