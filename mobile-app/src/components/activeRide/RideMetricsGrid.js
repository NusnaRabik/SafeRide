import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function RideMetricsGrid({ seconds = 48, distanceKm = 0.0 }) {
  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <View style={styles.container}>
      {/* Metric 1: Ride Time */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <MaterialIcons
            name="schedule"
            size={14}
            color={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.headerText}>RIDE TIME</Text>
        </View>
        <Text style={styles.value}>{formatTime(seconds)}</Text>
        <Text style={styles.subtitle}>Current ride duration</Text>
      </View>

      {/* Metric 2: Distance */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <MaterialIcons
            name="straighten"
            size={14}
            color={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.headerText}>DISTANCE</Text>
        </View>
        <Text style={styles.value}>{distanceKm.toFixed(1)} km</Text>
        <Text style={styles.subtitle}>Distance travelled</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: spacing.xs,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#e8edff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 5,
  },
  headerText: {
    fontFamily: fonts.manropeBold,
    fontSize: 10,
    color: colors.primary,
    letterSpacing: 0.6,
  },
  value: {
    fontFamily: fonts.manropeBold,
    fontSize: 18,
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
});

