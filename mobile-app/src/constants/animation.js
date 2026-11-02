import { Platform } from 'react-native';

// The native animation driver doesn't exist in the web browser, so only use it on phones.
export const USE_NATIVE_DRIVER = Platform.OS !== 'web';