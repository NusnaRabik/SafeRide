// Design tokens taken from the SafeRide screen HTML (Tailwind config).
export const colors = {
  background: '#f9f9ff',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f1f3ff',
  surfaceContainer: '#e8edff',
  surfaceContainerHigh: '#e0e8ff',
  primary: '#002541',
  primaryContainer: '#123b5d',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#82a5cd',
  onPrimaryFixedVariant: '#24496c',
  primaryFixed: '#d0e4ff',
  onPrimaryFixed: '#001d34',
  secondary: '#006c45',
  secondaryContainer: '#86f9bc',
  onSecondaryContainer: '#00734a',
  onSurface: '#041b3c',
  onSurfaceVariant: '#42474e',
  outline: '#73777f',
  outlineVariant: '#c2c7cf',
  error: '#ba1a1a',
  // Accident History screen
  danger: '#dc2626',
  dangerSurface: '#fef2f2',
  success: '#22a06b',
  successSurface: 'rgba(34,160,107,0.1)',
  border: '#f1f5f9',
  chevron: '#94a3b8',
};

export const fonts = {
  manropeSemi: 'Manrope_600SemiBold',
  manropeBold: 'Manrope_700Bold',
  manropeExtra: 'Manrope_800ExtraBold',
  body: 'HankenGrotesk_400Regular',
  bodyMedium: 'HankenGrotesk_500Medium',
};

export const spacing = { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 };
export const radius = { default: 4, lg: 8, xl: 12, full: 999 };

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};