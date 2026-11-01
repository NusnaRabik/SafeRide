import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../constants/theme';

export default function WarningHeadline() {
  return (
    <View style={styles.container}>
      {/* High-Contrast Prompt */}
      <Text style={styles.headline}>Are you OK?</Text>

      {/* Actionable Instruction Subtext */}
      <Text style={styles.subtext}>
        Confirm that you're safe before the countdown ends.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  headline: {
    fontFamily: fonts.manropeExtra,
    fontSize: 34,
    color: colors.onSurface,
    letterSpacing: -0.5,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtext: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});