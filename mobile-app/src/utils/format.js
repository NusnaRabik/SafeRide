const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();

export const formatTime = (date) => {
  const h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h % 12 || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`;
};

// "Today, 8:45 AM" | "Yesterday, 5:20 PM" | "12 Oct 2026, 7:15 AM"
export const formatRideDate = (iso, now = new Date()) => {
  const d = new Date(iso);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  let day;
  if (isSameDay(d, now)) day = 'Today';
  else if (isSameDay(d, yesterday)) day = 'Yesterday';
  else day = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

  return `${day}, ${formatTime(d)}`;
};

export const formatDistance = (km) => `${Number(km.toFixed(1))} km`;
export const formatDuration = (mins) => `${mins} mins`;
export const formatRideCount = (n) => `${n} ${n === 1 ? 'Ride' : 'Rides'}`;

// "Home (Baseline Road)" -> "Home"
export const shortPlace = (name) => name.split(' (')[0];

// "18 Oct 2026 • 10:14 AM"
export const formatIncidentDate = (iso) => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()} • ${formatTime(d)}`;
};