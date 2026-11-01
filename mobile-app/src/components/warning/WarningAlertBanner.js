import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function WarningAlertBanner() {
  return (
    <View style={styles.container}>
      {/* Red Alert Pill */}
      <View style={styles.alertPill}>
        <MaterialIcons
          name="warning"
          size={16}
          color={colors.danger}
          style={styles.pillIcon}
        />
        <Text style={styles.pillText}>POSSIBLE ACCIDENT DETECTED</Text>
        <View style={styles.redDot} />
      </View>

      {/* Sensor Diagnostic Subtext */}
      <Text style={styles.subtitle}>
        Unusual movement detected by your SafeRide helmet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  alertPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.25)',
    marginBottom: spacing.sm,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontFamily: fonts.manropeExtra,
    fontSize: 11,
    color: colors.danger,
    letterSpacing: 0.6,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
    marginLeft: 8,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});