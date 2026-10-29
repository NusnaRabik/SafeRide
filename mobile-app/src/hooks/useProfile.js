import { useCallback, useEffect, useState } from 'react';
import {
  fetchProfile,
  logout as apiLogout,
  updateProfile as apiUpdateProfile,
} from '../services/api/profileApi';

export function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUser(await fetchProfile());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const signOut = useCallback(async () => {
    setLoggingOut(true);
    try {
      await apiLogout();
      return true;
    } finally {
      setLoggingOut(false);
    }
  }, []);

  const saveProfile = useCallback(async (payload) => {
    setSaving(true);
    try {
      const res = await apiUpdateProfile(payload);
      if (res?.user) setUser(res.user);
      return true;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    reload: load,
    signOut,
    loggingOut,
    saveProfile,
    saving,
  };
}