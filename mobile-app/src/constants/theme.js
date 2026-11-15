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
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  // SOS card / tertiary danger palette
  tertiaryContainer: '#790007',
  onTertiaryContainer: '#ff7a6e',
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

const extendedColors = {
  ...colors,
  surface: colors.background,
  surfaceDim: '#cadaff',
  surfaceBright: '#f9f9ff',
  surfaceVariant: '#d7e2ff',
  surfaceContainerLowest: colors.surfaceLowest,
  surfaceContainerLow: colors.surfaceLow,
  surfaceContainer: colors.surfaceContainer,
  surfaceContainerHigh: colors.surfaceContainerHigh,
  surfaceContainerHighest: '#d7e2ff',
  onBackground: colors.onSurface,
  onError: '#ffffff',
  onSecondary: '#ffffff',
  onSecondaryFixed: '#002112',
  onSecondaryFixedVariant: colors.onSecondaryContainer,
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  secondaryFixed: colors.secondaryContainer,
  secondaryFixedDim: '#69dca1',
  inverseSurface: '#1d3052',
  inverseOnSurface: '#edf0ff',
  inversePrimary: '#a6caf3',
  surfaceTint: '#3d6185',
};

const typography = {
  headlineSm: { fontFamily: 'Manrope_600SemiBold', fontSize: 20, lineHeight: 28, fontWeight: '600', letterSpacing: -0.2 },
  headlineLg: { fontFamily: 'Manrope_700Bold', fontSize: 28, lineHeight: 36, fontWeight: '700', letterSpacing: -0.56 },
  labelSm: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: 0.48 },
  labelLg: { fontFamily: 'Manrope_700Bold', fontSize: 14, lineHeight: 20, fontWeight: '700', letterSpacing: 0.7 },
  bodySm: { fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: 0.14 },
  bodyMd: { fontFamily: 'HankenGrotesk_400Regular', fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyLg: { fontFamily: 'HankenGrotesk_500Medium', fontSize: 18, lineHeight: 28, fontWeight: '500' },
  displayLg: { fontFamily: 'Manrope_800ExtraBold', fontSize: 56, lineHeight: 60, fontWeight: '800', letterSpacing: -1.68 },
  displayMd: { fontFamily: 'Manrope_700Bold', fontSize: 40, lineHeight: 44, fontWeight: '700', letterSpacing: -0.8 },
};

export const theme = { colors: extendedColors, typography, fonts, spacing, radius, shadow };