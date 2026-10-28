import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../constants/theme';

// variant: 'hero' (big call-to-action) | 'solid' (navy form submit) | 'danger' (SOS) | 'primary' (dark form submit) | 'tonal' (cancel)
// iconPosition: 'left' (default) | 'right'
const VARIANTS = {
  hero: { bg: colors.primaryContainer, fg: colors.onPrimary, font: fonts.manropeSemi, size: 20, raised: true },
  solid: { bg: colors.primaryContainer, fg: colors.onPrimary, font: fonts.manropeBold, size: 16, raised: true },
  danger: { bg: colors.error, fg: colors.onError, font: fonts.manropeBold, size: 14, raised: true },
  primary: { bg: colors.primary, fg: colors.onPrimary, font: fonts.manropeBold, size: 14, raised: true },
  tonal: { bg: colors.surfaceContainer, fg: colors.onPrimaryContainer, font: fonts.manropeBold, size: 14, raised: false },
};

export default function AppButton({ label, icon, iconPosition = 'left', onPress, variant = 'primary', disabled, style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const iconEl = icon ? <MaterialIcons name={icon} size={variant === 'hero' ? 22 : 20} color={v.fg} /> : null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, { backgroundColor: v.bg }, v.raised && styles.raised, disabled && { opacity: 0.7 }, style]}
    >
      {iconPosition === 'left' && iconEl}
      <Text style={{ fontFamily: v.font, fontSize: v.size, color: v.fg }}>{label}</Text>
      {iconPosition === 'right' && iconEl}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  raised: { ...shadow, elevation: 4 },
});