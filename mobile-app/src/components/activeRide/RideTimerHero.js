import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function RideTimerHero({ seconds = 48 }) {
  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <View style={styles.card}>
      {/* Top Header Tag */}
      <View style={styles.headerRow}>
        <MaterialIcons
          name="schedule"
          size={14}
          color={colors.primary}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>YOUR RIDE</Text>
      </View>

      {/* Massive Glanceable Digits */}
      <Text style={styles.timerDigits}>{formatTime(seconds)}</Text>

      {/* Subtitles */}
      <View style={styles.footerWrap}>
        <Text style={styles.title}>Ride Duration</Text>
        <Text style={styles.subtitle}>Your ride is in progress.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: '#e8edff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerIcon: {
    marginRight: 6,
  },
  headerText: {
    fontFamily: fonts.manropeBold,
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 0.8,
  },
  timerDigits: {
    fontFamily: fonts.manropeExtra,
    fontSize: 46,
    color: colors.onSurface,
    letterSpacing: -1,
    marginVertical: 4,
  },
  footerWrap: {
    alignItems: 'center',
    marginTop: 4,
  },
  title: {
    fontFamily: fonts.manropeBold,
    fontSize: 14,
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});

