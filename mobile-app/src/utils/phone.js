import { Linking } from 'react-native';

export const DEFAULT_PHONE_PREFIX = '+94 ';

export const callNumber = (phone) => Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);

// Very light check: enough digits after stripping spaces/symbols
export const isValidPhone = (phone) => phone.replace(/\D/g, '').length >= 9;