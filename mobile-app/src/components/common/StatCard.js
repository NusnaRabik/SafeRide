import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';

export default function StatCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.md,
    justifyContent: 'center',
    ...shadow,
  },
  label: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.onSurfaceVariant },
  value: { fontFamily: fonts.manropeBold, fontSize: 20, color: colors.primary, marginTop: 4 },
});