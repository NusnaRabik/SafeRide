// Temporary in-memory "API". Replace with a real HTTPS call to the backend later.

const at = (daysAgo, hour, minute) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const rides = [
  {
    id: 'r1',
    startedAt: at(0, 8, 45),
    durationMins: 28,
    distanceKm: 14.2,
    start: 'Home (Baseline Road)',
    end: 'University Campus',
    hasGps: true,
  },
  {
    id: 'r2',
    startedAt: at(1, 17, 20),
    durationMins: 15,
    distanceKm: 6.8,
    start: 'University Campus',
    end: 'City Center Hub',
    hasGps: true,
  },
  {
    id: 'r3',
    startedAt: new Date(2026, 9, 12, 7, 15).toISOString(),
    durationMins: 45,
    distanceKm: 21.6,
    start: 'Home (Baseline Road)',
    end: 'North Ring District',
    hasGps: false,
  },
];

const delay = (v) => new Promise((r) => setTimeout(() => r(v), 150));

export const fetchRides = () => delay([...rides].sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)));