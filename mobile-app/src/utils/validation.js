import { isValidPhone } from './phone';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value) => EMAIL_REGEX.test(value.trim());

// The login field accepts either an email or a mobile number
export const isValidIdentifier = (value) => {
  const v = value.trim();
  return v.includes('@') ? isValidEmail(v) : isValidPhone(v);
};

export const MIN_PASSWORD_LENGTH = 8;
export const isValidPassword = (value) => value.length >= MIN_PASSWORD_LENGTH;
export const isValidName = (value) => value.trim().length >= 2;