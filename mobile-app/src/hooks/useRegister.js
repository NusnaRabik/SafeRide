import { useState } from 'react';
import { isValidIdentifier, isValidName, isValidPassword, MIN_PASSWORD_LENGTH } from '../utils/validation';
import * as api from '../services/api/authApi';

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Returns true when the account was created
  const register = async ({ fullName, identifier, password, confirmPassword }) => {
    setError('');

    if (!fullName.trim() || !identifier.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!isValidName(fullName)) {
      setError('Enter your full name.');
      return false;
    }
    if (!isValidIdentifier(identifier)) {
      setError('Enter a valid email address or mobile number.');
      return false;
    }
    if (!isValidPassword(password)) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    setLoading(true);
    try {
      await api.register({ fullName: fullName.trim(), identifier: identifier.trim(), password });
      return true;
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}