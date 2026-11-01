import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function SafetyConfirmedBanner() {
  return (
    <View style={styles.container}>
      {/* 1. Green Reassurance Pill */}
      <View style={styles.pill}>
        <MaterialIcons
          name="check-circle"
          size={16}
          color={colors.success}
          style={styles.pillIcon}
        />
        <Text style={styles.pillText}>SAFETY CONFIRMED</Text>
        <View style={styles.greenDot} />
      </View>

      {/* 2. Sub-caption */}
      <Text style={styles.caption}>Safety confirmed by rider</Text>

      {/* 3. Reassurance Headline */}
      <Text style={styles.headline}>Glad you're OK!</Text>

      {/* 4. Cancellation Notice */}
      <Text style={styles.subtext}>
        You've confirmed that you're safe. The pending automatic emergency alert has been cancelled.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    width: '100%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 160, 107, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(34, 160, 107, 0.25)',
    marginBottom: spacing.xs,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontFamily: fonts.manropeExtra,
    fontSize: 11,
    color: '#0d5c38',
    letterSpacing: 0.6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginLeft: 8,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 6,
  },
  headline: {
    fontFamily: fonts.manropeExtra,
    fontSize: 30,
    color: colors.onSurface,
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtext: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.sm,
  },
});