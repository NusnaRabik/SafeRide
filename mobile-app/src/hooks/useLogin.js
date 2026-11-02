import { useState } from 'react';
import { isValidIdentifier } from '../utils/validation';
import * as api from '../services/api/authApi';

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Returns true when login succeeds
  const login = async ({ identifier, password }) => {
    setError('');

    if (!identifier.trim() || !password) {
      setError('Enter your email or phone number and password.');
      return false;
    }
    if (!isValidIdentifier(identifier)) {
      setError('Enter a valid email address or mobile number.');
      return false;
    }

    setLoading(true);
    try {
      await api.login({ identifier: identifier.trim(), password });
      // TODO: store the token securely (expo-secure-store) once the real backend is connected
      return true;
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}