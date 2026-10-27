// Temporary in-memory "API". Later: save these preferences to the backend (user profile)
// so push notifications respect them, and replace the bodies below with real HTTPS calls.
let settings = {
  emergencyAlerts: true,
  rideNotifications: true,
};

const delay = (v) => new Promise((r) => setTimeout(() => r(v), 100));

export const fetchSettings = () => delay({ ...settings });

export const saveSetting = (key, value) => {
  settings = { ...settings, [key]: value };
  return delay({ ...settings });
};