// Shared campaign logic (functions). Campaign data loads via campaigns-loader.js
// which fetches campaigns.json and applies currency detection.

let campaigns = [];

async function loadCampaigns() {
  if (campaigns.length > 0) return campaigns;
  try {
    const res = await fetch('./campaigns.json');
    campaigns = await res.json();
    campaigns.forEach(c => {
      if (!c.currency) {
        const text = (c.name + ' ' + (c.description || '')).toLowerCase();
        // Detect currency from location/language clues
        if (/liverpool|uk|pound|£|gbp|england|scotland|wales|british/.test(text)) {
          c.currency = 'GBP';
        } else if (/australia|au\$|aud|sydney|melbourne|brisbane/.test(text)) {
          c.currency = 'AUD';
        } else if (/canada|ca\$|cad|toronto|vancouver/.test(text)) {
          c.currency = 'CAD';
        } else if (/philippines|philippine|peso/.test(text)) {
          c.currency = 'PHP';
        } else if (/jamaica|caribbean|jmd/.test(text)) {
          c.currency = 'JMD';
        } else if (/cameroon|cameroun|franc|cfa/.test(text)) {
          c.currency = 'XAF';
        }
        // Default: USD (no currency field)
      }
    });
  } catch (e) {
    console.error('Failed to load campaigns.json:', e);
    campaigns = [];
  }
  return campaigns;
}

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

const LOW_PERCENTAGE_THRESHOLD = 10;
const HIGH_PERCENTAGE_THRESHOLD = 85;

function qualifiesAsFallback(c) {
  const pct = percentOfGoal(c);
  return (pct !== null && pct < LOW_PERCENTAGE_THRESHOLD) || c.lowEngagementFlag === true;
}

function qualifiesAsWellOnWay(c) {
  const pct = percentOfGoal(c);
  return pct !== null && pct >= HIGH_PERCENTAGE_THRESHOLD;
}

function tierLabel(key) {
  return { seed: 'Seed', first_five: 'First Five', first_ten: 'First Ten', graduated: 'Graduated' }[key] || '';
}

function fallbackLabel(c) {
  const pct = percentOfGoal(c);
  if (pct !== null && pct < LOW_PERCENTAGE_THRESHOLD) {
    return `${Math.round(pct)}% of goal reached`;
  }
  if (c.lowEngagementFlag) return 'Low engagement — added manually';
  return 'Added manually';
}

function wellOnWayLabel(c) {
  const pct = percentOfGoal(c);
  return pct !== null ? `${Math.round(pct)}% of goal reached` : 'Well on their way';
}

function daysSinceEpoch(d) { return Math.floor(d.getTime() / 86400000); }

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
  const picks = rotatable.slice(0, remainingSlots);
  return [...pinned, ...picks].slice(0, size);
}

function computeToday() {
  const eligible = campaigns.filter(c =>
    !c.reported && (tierOf(c) !== 'graduated' || qualifiesAsFallback(c) || qualifiesAsWellOnWay(c))
  );
  const pinnedAny = eligible.filter(c => isPinned(c));
  const seedPool = eligible.filter(c => tierOf(c) === 'seed');
  const spotlight = selectSection(pinnedAny.length ? pinnedAny : seedPool, 1)[0]
    || selectSection(eligible, 1)[0]
    || null;

  const spotlightId = spotlight ? spotlight.id : null;
  const zeroPool = eligible.filter(c => tierOf(c) === 'seed' && c.id !== spotlightId);
  const zeroSection = selectSection(zeroPool, 15);
  const tlcPool = eligible.filter(c => tierOf(c) !== 'seed' && c.id !== spotlightId);
  const tlcSection = selectSection(tlcPool, 10);
  const wellOnWayPool = eligible.filter(c => qualifiesAsWellOnWay(c) && c.id !== spotlightId);
  const wellOnWaySection = selectSection(wellOnWayPool, 8);

  return { spotlight, zeroSection, tlcSection, wellOnWaySection };
}
