import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ReadinessBanner({ isReady = true }) {
  if (!isReady) {
    return (
      <View style={[styles.card, styles.cardWarning]}>
        <View style={[styles.iconCircle, styles.iconCircleWarning]}>
          <MaterialIcons name="error-outline" size={24} color={colors.danger} />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, styles.titleWarning]}>
            Action Required ⚠
          </Text>
          <Text style={styles.subtitle}>
            Complete the safety checks below before starting your ride.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Verified Shield / Checkmark Badge */}
      <View style={styles.iconCircle}>
        <MaterialIcons name="verified" size={26} color={colors.success} />
      </View>

      {/* Headline & Description */}
      <View style={styles.textWrap}>
        <Text style={styles.title}>Ready to Ride ✓</Text>
        <Text style={styles.subtitle}>Your safety checks are complete.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf8f0',
    borderColor: '#c6edd4',
    borderWidth: 1,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  cardWarning: {
    backgroundColor: '#fff4e5',
    borderColor: '#ffe2be',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34, 160, 107, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconCircleWarning: {
    backgroundColor: 'rgba(220, 38, 38, 0.12)',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.manropeBold,
    fontSize: 15,
    color: '#0d5c38',
    marginBottom: 2,
  },
  titleWarning: {
    color: '#b45309',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
});

