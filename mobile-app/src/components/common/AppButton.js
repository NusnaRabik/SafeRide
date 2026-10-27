import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../constants/theme';

// variant: 'hero' (big call-to-action) | 'primary' (form submit) | 'tonal' (cancel)
const VARIANTS = {
  hero: { bg: colors.primaryContainer, fg: colors.onPrimary, font: fonts.manropeSemi, size: 20, raised: true },
  primary: { bg: colors.primary, fg: colors.onPrimary, font: fonts.manropeBold, size: 14, raised: true },
  tonal: { bg: colors.surfaceContainer, fg: colors.onPrimaryContainer, font: fonts.manropeBold, size: 14, raised: false },
};

export default function AppButton({ label, icon, onPress, variant = 'primary', style }) {
  const v = VARIANTS[variant];
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.base, { backgroundColor: v.bg }, v.raised && styles.raised, style]}
    >
      {icon && <MaterialIcons name={icon} size={variant === 'hero' ? 22 : 20} color={v.fg} />}
      <Text style={{ fontFamily: v.font, fontSize: v.size, color: v.fg }}>{label}</Text>
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