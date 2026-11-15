import { useEffect, useState } from 'react';
import * as api from '../services/api/settingsApi';

export default function useSettings() {
  const [settings, setSettings] = useState({ emergencyAlerts: true, rideNotifications: true });

  useEffect(() => {
    let active = true;
    api.fetchSettings().then((data) => active && setSettings(data));
    return () => {
      active = false;
    };
  }, []);

  // Update the switch immediately, then save in the background
  const setSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    api.saveSetting(key, value);
  };

  return { settings, setSetting };
}