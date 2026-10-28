import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/theme';
import PulseDot from './PulseDot';

// Small pill with a dot: tone 'success' (green, pulsing) or 'neutral' (grey)
const TONES = {
  success: { bg: 'rgba(134,249,188,0.5)', dot: colors.secondary, text: colors.onSecondaryFixedVariant },
  neutral: { bg: colors.surfaceContainerHigh, dot: colors.outline, text: colors.onSurfaceVariant },
};

export default function StatusPill({ label, tone = 'neutral', pulse = false }) {
  const t = TONES[tone];
  return (
    <View style={[styles.pill, { backgroundColor: t.bg }]}>
      {pulse ? (
        <PulseDot size={8} color={t.dot} />
      ) : (
        <View style={[styles.dot, { backgroundColor: t.dot }]} />
      )}
      <Text style={[styles.text, { color: t.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5 },
});