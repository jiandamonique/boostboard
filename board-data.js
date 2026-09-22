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
    "donationCount": 5,
    "submittedDate": "2026-09-07",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-jaye.webp",
    "pinReason": "",
    "amountRaised": 240,
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-simba.webp",
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
    "donationCount": 8,
    "amountRaised": 160,
    "goalAmount": 1200,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-jimmy.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-liverpool.webp",
    "category": [
      "Community"
    ]
  },
  {
    "id": "c005",
    "name": "Helping a Family Rebuild After Firework Tragedy",
    "communities": [],
    "description": "A firework explosion caused major home damage and serious injuries on July 4th -- one family member remains in critical condition undergoing repeat surgeries.",
    "link": "https://www.gofundme.com/f/helping-a-family-rebuild-after-firework-tragedy",
    "donationCount": 5,
    "amountRaised": 435,
    "goalAmount": 5000,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-rubie.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-midnight.webp",
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
    "donationCount": 7,
    "amountRaised": 150,
    "goalAmount": 900,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-dog.webp",
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
    "donationCount": 8,
    "amountRaised": 90,
    "goalAmount": 200,
    "lowEngagementFlag": false,
    "submittedDate": "2026-09-07",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-eloise.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "pinReason": "",
    "reported": false,
    "imageUrl": "./campaigns/campaign-family.webp",
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
    "imageUrl": "./campaigns/campaign-aubry.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-wikif.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-mari.webp",
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
    "imageUrl": "./campaigns/campaign-savannah.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-santone.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-cole.webp",
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
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-kenyatta.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Community"
    ]
  },
  {
    "id": "c017",
    "name": "RN Is Now the One in Need of Help",
    "communities": [],
    "description": "After 25 years working as a CNA, LPN, and Registered Nurse -- including through COVID -- Andrea's own health has broken down, and she's raising two children with almost no support system.",
    "link": "https://www.gofundme.com/f/help-andrea-recover-and-support-her-family-qwepd",
    "donationCount": 0,
    "submittedDate": "2026-09-10",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-andrea.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Medical",
      "Family Support"
    ]
  },
  {
    "id": "c018",
    "name": "Help Us Get a Car with Just $1",
    "communities": [],
    "description": "Raising money toward purchasing a reliable used car, a dollar at a time.",
    "link": "https://www.gofundme.com/f/help-us-get-a-car-with-just-1",
    "donationCount": 0,
    "submittedDate": "2026-09-13",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-dollarcar.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Financial Hardship"
    ]
  },
  {
    "id": "c019",
    "name": "Help a Computer Engineering Student Finish Her Degree",
    "communities": [],
    "description": "Support for Maree to finish her computer engineering degree.",
    "link": "https://www.gofundme.com/f/help-a-computer-engineering-student-finish-her-degree",
    "donationCount": 0,
    "submittedDate": "2026-09-13",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-maree.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Education"
    ]
  },
  {
    "id": "c020",
    "name": "Help Sarahi Get Back on Her Feet",
    "communities": [],
    "description": "Sarahi's campaign makes rent and groceries possible while searching for new work ahead.",
    "link": "https://www.gofundme.com/f/help-sarahi-get-back-on-her-feet",
    "donationCount": 0,
    "submittedDate": "2026-09-14",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-help-sarahi-get-back-on-her-feet.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Financial Hardship"
    ]
  },
  {
    "id": "c021",
    "name": "Help a Caregiver Mom Rebuild After Surgery",
    "communities": [],
    "description": "A single mom of four recovering from open heart surgery and a valve replacement needs support rebuilding.",
    "link": "https://www.gofundme.com/f/help-a-caregiver-mom-rebuild-after-surgery",
    "donationCount": 0,
    "submittedDate": "2026-09-14",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-help-a-caregiver-mom-rebuild-after-surgery.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Medical",
      "Family Support"
    ]
  },
  {
    "id": "c022",
    "name": "Support Ricky's Recovery & Bella's Care",
    "communities": [],
    "description": "Ricky is navigating tough health challenges while also caring for Bella.",
    "link": "https://www.gofundme.com/f/support-rickys-recovery-bellas-care",
    "donationCount": 0,
    "submittedDate": "2026-09-14",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-support-rickys-recovery-and-bellas-care.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Medical"
    ]
  },
  {
    "id": "c025",
    "name": "Help Jessica Create a Safe Home",
    "communities": [],
    "description": "Jessica's fund covers septic installation and a future mobile home for her family's safety.",
    "link": "https://www.gofundme.com/f/help-jessica-create-a-safe-home",
    "donationCount": 0,
    "submittedDate": "2026-09-14",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-help-jessica-create-a-safe-home.webp",
    "pinReason": "",
    "amountRaised": null,
    "goalAmount": null,
    "lowEngagementFlag": false,
    "category": [
      "Housing"
    ]
  },
  {
    "id": "c026",
    "name": "Standing with Brian in His Time of Need",
    "communities": [],
    "description": "Brian has selflessly served as a fire keeper for his community and now needs support of his own.",
    "link": "https://www.gofundme.com/f/standing-with-brian-in-his-time-of-need-93ka7",
    "donationCount": 5,
    "submittedDate": "2026-09-15",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-standing-with-brian-in-his-time-of-need.webp",
    "pinReason": "",
    "amountRaised": 450,
    "goalAmount": 3500,
    "lowEngagementFlag": false,
    "category": [
      "Community",
      "Crisis"
    ]
  },
  {
    "id": "c027",
    "name": "Help Imani Achieve Her College Dreams",
    "communities": [],
    "description": "A recent high school graduate raising support to help make college possible.",
    "link": "https://www.gofundme.com/f/help-imani-achieve-her-college-dreams-sdzj6",
    "donationCount": 9,
    "submittedDate": "2026-09-15",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-help-imani-achieve-her-college-dreams.webp",
    "pinReason": "",
    "amountRaised": 665,
    "goalAmount": 1600,
    "lowEngagementFlag": false,
    "category": [
      "Education"
    ]
  },
  {
    "id": "c028",
    "name": "Housing and Essentials for Tina",
    "communities": [],
    "description": "Tina rushed to California to support her 34-year-old son after he suffered a stroke, and now needs help with housing and essentials.",
    "link": "https://www.gofundme.com/f/housing-and-essentials-for-tina",
    "donationCount": 5,
    "submittedDate": "2026-09-15",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-housing-and-essentials-for-tina.webp",
    "pinReason": "",
    "amountRaised": 305,
    "goalAmount": 3000,
    "lowEngagementFlag": false,
    "category": [
      "Housing",
      "Family Support"
    ]
  },
  {
    "id": "c029",
    "name": "Help Sustain Lisa Hartouni's Work",
    "communities": [],
    "description": "Lisa Hartouni has spent decades using photography and community storytelling to document and support her community.",
    "link": "https://www.gofundme.com/f/help-sustain-lisa-hartounis-work",
    "donationCount": 6,
    "submittedDate": "2026-09-16",
    "lastFeatured": null,
    "pinned": true,
    "pinnedUntil": "2026-09-18",
    "reported": false,
    "imageUrl": "./campaigns/campaign-help-sustain-lisa-hartounis-work.webp",
    "pinReason": "",
    "amountRaised": 450,
    "goalAmount": 2000,
    "lowEngagementFlag": false,
    "category": [
      "Community"
    ]
  },
  {
    "id": "c030",
    "name": "Support My Recovery and Legal Journey",
    "communities": [],
    "description": "Covers travel, court fines, and bond payments for a Louisiana court date during recovery from addiction.",
    "link": "https://www.gofundme.com/f/support-my-recovery-and-legal-journey",
    "donationCount": 4,
    "submittedDate": "2026-09-19",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-support-my-recovery-and-legal-journey.webp",
    "pinReason": "",
    "amountRaised": 120,
    "goalAmount": 1100,
    "lowEngagementFlag": false,
    "category": [
      "Financial Hardship",
      "Legal"
    ]
  },
  {
    "id": "c031",
    "name": "Support Jaime's Journey to Medical School",
    "communities": [],
    "description": "Helps cover application costs and tuition as he pursues medical school after years of community service work.",
    "link": "https://www.gofundme.com/f/2ajdv-support-jaimes-journey-to-medical-school",
    "donationCount": 6,
    "submittedDate": "2026-09-19",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-support-jaimes-journey-to-medical-school.webp",
    "pinReason": "",
    "amountRaised": 400,
    "goalAmount": 4500,
    "lowEngagementFlag": false,
    "category": [
      "Education"
    ]
  },
  {
    "id": "c032",
    "name": "Care for 3 Dogs Left on My Patio",
    "communities": [],
    "description": "A home-based dog rescue caring for three dogs abandoned on the organizer's patio, covering emergency vet visits, blood work, and treatment for injuries and infection.",
    "link": "https://www.gofundme.com/f/care-for-3-dogs-left-on-my-patio",
    "donationCount": 1,
    "submittedDate": "2026-09-20",
    "lastFeatured": "2026-09-21",
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-care-for-3-dogs-left-on-my-patio.webp",
    "pinReason": "",
    "amountRaised": 20,
    "goalAmount": 1600,
    "lowEngagementFlag": false,
    "category": [
      "Animals",
      "Medical"
    ]
  },
  {
    "id": "c033",
    "name": "Disabled Family in Rural Area Needing Safe Transportation",
    "communities": [],
    "description": "A disabled family of three in a rural area needs help replacing a family van with an irreparable engine, after the mother's emergency spinal fusion surgery left the family relying on safe transportation for ongoing care.",
    "link": "https://www.gofundme.com/f/disabled-family-in-rural-area-needing-safe-transportation",
    "donationCount": 4,
    "submittedDate": "2026-09-21",
    "lastFeatured": null,
    "pinned": false,
    "reported": false,
    "imageUrl": "./campaigns/campaign-disabled-family-in-rural-area-needing-safe-transportation.webp",
    "pinReason": "",
    "amountRaised": 58,
    "goalAmount": 2400,
    "lowEngagementFlag": false,
    "category": [
      "Medical",
      "Family Support"
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

const LOW_PERCENTAGE_THRESHOLD = 10;  // percent — 10+ donors but barely made a dent
const HIGH_PERCENTAGE_THRESHOLD = 85; // percent — 10+ donors and well on their way

// Fallback eligibility: a campaign that's technically past the donor-count
// tiers (10+) can still show on the board in two different situations:
//
// 1. STRUGGLING: barely dented the dollar goal (under 10%) despite donor
//    count, or manually flagged as low-engagement by a moderator.
//    These show in the normal TLC/rotation pool as a supplement.
//
// 2. WELL ON THEIR WAY: reached 85%+ of goal. Good momentum — worth a
//    signal boost to carry them the rest of the way. These appear in
//    a separate "well on their way" section, not mixed with the
//    struggling campaigns. Label is clearly distinct so visitors
//    understand why a better-resourced campaign is back on the board.
//
// A campaign can only match one of these. If percentOfGoal is unknown
// (null), neither triggers — we only resurface when we have real numbers.
function qualifiesAsFallback(c) {
  const pct = percentOfGoal(c);
  const lowPercentage = pct !== null && pct < LOW_PERCENTAGE_THRESHOLD;
  return lowPercentage || c.lowEngagementFlag === true;
}

function qualifiesAsWellOnWay(c) {
  if (tierOf(c) !== 'graduated') return false;
  const pct = percentOfGoal(c);
  return pct !== null && pct >= HIGH_PERCENTAGE_THRESHOLD;
}

function tierLabel(key) {
  return { seed: 'Seed · 0 donors', first_five: 'First Five · 1–4 donors', first_ten: 'First Ten · 5–9 donors' }[key] || '';
}

// Label for a fallback-eligible campaign (10+ donors but still
// qualifies via low percent-of-goal or a flagged low-engagement note).
// Transparent about *why* it's here, since it's outside the normal
// donor-count tiers -- a visitor seeing a campaign with no explanation
// next to one that's clearly still struggling would be confusing.
function fallbackLabel(c) {
  const pct = percentOfGoal(c);
  if (pct !== null && pct < LOW_PERCENTAGE_THRESHOLD) {
    return `${Math.round(pct)}% of goal reached`;
  }
  if (c.lowEngagementFlag) return 'Low engagement — added manually';
  return 'Added manually';
}

// Label for a campaign that's well on its way (85%+ of goal).
// Warm but honest -- doesn't promise they're about to finish,
// since goal amounts vary wildly. Just says: good momentum, still
// worth a share.
function wellOnWayLabel(c) {
  const pct = percentOfGoal(c);
  if (pct !== null) return `${Math.round(pct)}% of goal — well on their way`;
  return 'Well on their way';
}

function daysSinceEpoch(d) {
  return Math.floor(d.getTime() / 86400000);
}

// A pin can carry an optional expiry date (pinnedUntil, "YYYY-MM-DD").
// Once today's date passes that, the campaign quietly falls back into
// normal rotation -- no manual step needed to un-pin it later. A pin
// with no pinnedUntil stays pinned indefinitely, same as before this
// existed.
function isPinned(c) {
  if (!c.pinned) return false;
  if (!c.pinnedUntil) return true;
  const todayStr = new Date().toISOString().slice(0, 10);
  return todayStr <= c.pinnedUntil;
}

// Shared selector: pinned entries in the pool always get a slot. Everyone
// else is ordered by lastFeatured (never-featured and longest-waiting
// campaigns first, oldest submittedDate as a tiebreaker), so the pool
// works through in a genuine "everyone gets a turn" order.
//
// This replaced a pure date-seeded index (`daysSinceEpoch % pool.length`)
// that looked fair but wasn't: that formula only guarantees a full cycle
// before repeating if the pool stays a FIXED size. Since campaigns get
// added or age out of a tier constantly, the pool's size changes often,
// which reshuffles what each index points to and can let a campaign
// repeat before everyone else has had a turn -- confirmed happening on
// 2026-09-20. Sorting by lastFeatured has no such blind spot: it doesn't
// matter how the pool's size or membership changes day to day, because
// the ordering is always "whoever's waited longest goes next," using
// data attached to each campaign rather than its position in an array.
//
// This only works as long as lastFeatured actually gets stamped after a
// campaign is shown -- see mark-featured.js and its daily workflow.
function selectSection(pool, size) {
  const pinned = pool.filter(c => isPinned(c));
  const rotatable = pool
    .filter(c => !isPinned(c))
    .slice()
    .sort((a, b) => {
      const aKey = a.lastFeatured || '';
      const bKey = b.lastFeatured || '';
      if (aKey !== bKey) return aKey.localeCompare(bKey); // '' (never featured) sorts first
      return (a.submittedDate || '').localeCompare(b.submittedDate || '');
    });

  const remainingSlots = Math.max(size - pinned.length, 0);
  const picks = rotatable.slice(0, remainingSlots);
  return [...pinned, ...picks].slice(0, size);
}

// Computes today's spotlight, zero-donation section, TLC section, and
// "well on their way" section from the shared dataset.
// - index.html uses just the spotlight
// - board.html uses zeroSection + tlcSection + wellOnWaySection
// - archive.html reads the full graduated pool directly
function computeToday() {
  const eligible = campaigns.filter(c =>
    !c.reported && (tierOf(c) !== 'graduated' || qualifiesAsFallback(c))
  );

  // Spotlight preference: ANY pinned campaign wins first, regardless of tier --
  // an explicit moderator pin is a stronger signal than the donation-count
  // tier system, since it represents a deliberate "feature this specific
  // one" decision (e.g. a real person a moderator wants front and center).
  // Falls back to seed-tier rotation, then any eligible campaign as a last
  // resort, if nothing is pinned.
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

  // "Well on their way" section: graduated campaigns (10+ donors) that have
  // reached 85%+ of their goal. Shown separately from the main rotation --
  // good news, worth a final push, but clearly distinct from the struggling
  // fallback pool so visitors aren't confused about why they're here.
  const wellOnWayPool = campaigns.filter(c =>
    !c.reported && qualifiesAsWellOnWay(c) && c.id !== spotlightId
  );
  const wellOnWaySection = selectSection(wellOnWayPool, 6);

  return { spotlight, zeroSection, tlcSection, wellOnWaySection };
}
