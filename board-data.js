// Shared campaign data + selection logic, used by both index.html (the
// simple landing page) and board.html (the full rotating board). One
// source of truth instead of duplicating the dataset and tier/rotation
// math across two pages.
const campaigns = [
  {
    "id": "c001",
    "name": "Help Jaye Get Through September and Rebuild",
    "communities": [],
    "description": "Covers September rent, groceries, and yoga teaching certification tuition.",
    "link": "https://gofund.me/869772639",
    "donationCount": 2,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-jaye.webp",
    "pinReason": "",
    "amountRaised": 120,
    "goalAmount": 2400,
    "lowEngagementFlag": false,
    "category": [
      "Housing",
      "Financial Hardship"
    ]
  },
  {
    "id": "c002",
    "name": "Help Simba with Emergency Hospital Stay and Treatment",
    "communities": [],
    "description": "Emergency vet treatment for a blocked bladder -- hoping to avoid surgery, but repeat vet visits look likely.",
    "link": "https://www.gofundme.com/f/help-simba-with-surgery-rtznj",
    "donationCount": 3,
    "amountRaised": 40,
    "goalAmount": 450,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-simba.webp",
    "category": [
      "Animals",
      "Medical"
    ]
  },
  {
    "id": "c003",
    "name": "Help Jimmy Morgan Represent Jamaica Rugby League in Sydney",
    "communities": [],
    "description": "Funding flights, accommodation, and tournament costs to represent Jamaica in rugby league, since the national team receives no central funding.",
    "link": "https://www.gofundme.com/f/jimmy-morgan-represent-jamaica-rugby-league-in-sydney",
    "donationCount": 3,
    "amountRaised": 40,
    "goalAmount": 1200,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-jimmy.webp",
    "category": [
      "Sports"
    ]
  },
  {
    "id": "c004",
    "name": "Paint Liverpool Better",
    "communities": [],
    "description": "Starting a community project to give back the kind of practical support and positive experiences the organizer's own family once received.",
    "link": "https://www.gofundme.com/f/paint-liverpool-better",
    "donationCount": 4,
    "amountRaised": 40,
    "goalAmount": 700,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-liverpool.webp",
    "category": [
      "Community"
    ]
  },
  {
    "id": "c005",
    "name": "Helping a Family Rebuild After Firework Tragedy",
    "communities": [],
    "description": "A firework explosion caused major home damage and serious injuries on July 4th -- one family member remains in critical condition undergoing repeat surgeries.",
    "link": "https://www.gofundme.com/f/helping-a-family-rebuild-after-the-chino-firework-tragedy",
    "donationCount": 4,
    "amountRaised": 430,
    "goalAmount": 5000,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-rubie.webp",
    "category": [
      "Crisis",
      "Medical"
    ]
  },
  {
    "id": "c006",
    "name": "Midnight's Operation",
    "communities": [],
    "description": "After a year of cancer treatment, gaynor's 10-year-old dog Midnight needs tendon surgery on both back legs -- insurance covers part of it, but there's still a shortfall.",
    "link": "https://www.gofundme.com/f/midnights-operation-fpk8g",
    "donationCount": 3,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-midnight.webp",
    "pinReason": "",
    "amountRaised": 40,
    "goalAmount": 1300,
    "lowEngagementFlag": false,
    "category": [
      "Animals",
      "Medical"
    ]
  },
  {
    "id": "c007",
    "name": "Give a Dog a Second Chance",
    "communities": [],
    "description": "Funding a dog rescue programme that takes in dogs needing a second chance and helps prepare them for a new home.",
    "link": "https://www.gofundme.com/f/give-a-dog-a-second-chance",
    "donationCount": 6,
    "amountRaised": 100,
    "goalAmount": 900,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-dog.webp",
    "category": [
      "Animals"
    ]
  },
  {
    "id": "c008",
    "name": "Help Eloise Support Children's Education in the Philippines",
    "communities": [],
    "description": "Raising funds for children's school supplies and education support in the Philippines, tied to a Little Miss PESO UK pageant fundraiser.",
    "link": "https://www.gofundme.com/f/help-eloise-support-childrens-education-in-the-philippines",
    "donationCount": 5,
    "amountRaised": 50,
    "goalAmount": 200,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-eloise.webp",
    "category": [
      "Education",
      "International Aid"
    ]
  },
  {
    "id": "c009",
    "name": "Family in Desperate Situation",
    "communities": [],
    "description": "After leaving a job following workplace bullying and discrimination, trying to keep a roof over two kids' heads while things get sorted out.",
    "link": "https://www.gofundme.com/f/family-in-desperate-situation-5mgma",
    "donationCount": 4,
    "amountRaised": 40,
    "goalAmount": 150,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-family.webp",
    "category": [
      "Housing",
      "Family Support"
    ]
  },
  {
    "id": "c010",
    "name": "Help Aubry Return to ORU for Sophomore Year",
    "communities": [],
    "description": "Tuition to return to Oral Roberts University for sophomore year, after finishing freshman year with a 4.0 GPA.",
    "link": "https://www.gofundme.com/f/help-aubry-return-to-oru-for-sophomore-year",
    "donationCount": 30,
    "amountRaised": 1513,
    "goalAmount": 6500,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaign-aubry.webp",
    "category": [
      "Education"
    ]
  },
  {
    "id": "c011",
    "name": "Help WIKIF Build Community Water Taps in Buea, Cameroon",
    "communities": [],
    "description": "WIKIF's fund makes community water taps possible for families across Buea, Cameroon.",
    "link": "https://www.gofundme.com/f/help-wikif-build-community-water-taps-in-buea-cameroon",
    "donationCount": 1,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-wikif.webp",
    "pinReason": "",
    "amountRaised": 5,
    "goalAmount": 1200,
    "lowEngagementFlag": false,
    "category": [
      "International Aid",
      "Community"
    ]
  },
  {
    "id": "c012",
    "name": "A Mother and Baby Needing a Bridge to Work",
    "communities": [],
    "description": "This fund bridges essential bills and baby care while a mother secures remote work.",
    "link": "https://www.gofundme.com/f/a-mother-and-baby-needing-a-bridge-to-work",
    "donationCount": 0,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-mari.webp",
    "pinReason": "",
    "amountRaised": 0,
    "goalAmount": 10000,
    "lowEngagementFlag": false,
    "category": [
      "Family Support",
      "Financial Hardship"
    ]
  },
  {
    "id": "c013",
    "name": "Support Savannahs Legal Fight",
    "communities": [],
    "description": "Savannah's legal fund covers attorney fees and court expenses for custody proceedings.",
    "link": "https://www.gofundme.com/f/support-savannahs-legal-fight",
    "donationCount": 1,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-savannah.webp",
    "pinReason": "",
    "amountRaised": 50,
    "goalAmount": 2400,
    "lowEngagementFlag": false,
    "category": [
      "Legal",
      "Family Support"
    ]
  },
  {
    "id": "c014",
    "name": "Help Us Get to Work, School, and Medical Care",
    "communities": [],
    "description": "Family left homeless needs bus passes to reach work, school, and medical care.",
    "link": "https://www.gofundme.com/f/help-us-get-to-work-school-and-medical-care",
    "donationCount": 0,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-santone.webp",
    "pinReason": "",
    "amountRaised": 0,
    "goalAmount": 100,
    "lowEngagementFlag": false,
    "category": [
      "Housing",
      "Family Support"
    ]
  },
  {
    "id": "c015",
    "name": "Help Cole Rebuild After Service",
    "communities": [],
    "description": "Cole's campaign keeps loan payments, moving costs, and safe housing within reach again.",
    "link": "https://www.gofundme.com/f/help-cole-rebuild-after-service",
    "donationCount": 0,
    "submittedDate": "2026-09-07",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-cole.webp",
    "pinReason": "",
    "amountRaised": 0,
    "goalAmount": 1000,
    "lowEngagementFlag": false,
    "category": [
      "Housing",
      "Financial Hardship"
    ]
  },
  {
    "id": "c016",
    "name": "Help Us Open a Safe Haven for Survivors",
    "communities": [],
    "description": "Working to open a physical domestic violence shelter offering crisis support and connections to legal and housing resources.",
    "link": "https://www.gofundme.com/f/help-us-open-a-safe-haven-for-survivors-yjg47",
    "donationCount": 0,
    "submittedDate": "2026-09-10",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaign-kenyatta.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Community"
    ]
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

  // Hero preference: ANY pinned campaign wins first, regardless of tier --
  // an explicit moderator pin is a stronger signal than the donation-count
  // tier system, since it represents a deliberate "feature this specific
  // one" decision (e.g. a real person a moderator wants front and center).
  // Falls back to seed-tier rotation, then any eligible campaign as a last
  // resort, if nothing is pinned.
  const pinnedAny = eligible.filter(c => c.pinned);
  const seedPool = eligible.filter(c => tierOf(c) === 'seed');
  const hero = selectSection(pinnedAny.length ? pinnedAny : seedPool, 1)[0]
    || selectSection(eligible, 1)[0]
    || null;

  const heroId = hero ? hero.id : null;
  const zeroPool = eligible.filter(c => tierOf(c) === 'seed' && c.id !== heroId);
  const zeroSection = selectSection(zeroPool, ZERO_SECTION_SIZE);
  const tlcPool = eligible.filter(c => tierOf(c) !== 'seed' && c.id !== heroId);
  const tlcSection = selectSection(tlcPool, TLC_SECTION_SIZE);

  return { hero, zeroSection, tlcSection };
}
