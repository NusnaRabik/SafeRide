import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function SafetyMonitoringCard({ isActive = true }) {
  return (
    <View style={styles.card}>
      {/* Left Shield Icon */}
      <View style={styles.iconWrap}>
        <MaterialIcons
          name="security"
          size={22}
          color={colors.primary}
        />
      </View>

      {/* Center Copy */}
      <View style={styles.textWrap}>
        <Text style={styles.title}>Safety Monitoring</Text>
        <Text style={styles.subtitle}>
          Your connected helmet is monitoring for potential accidents.
        </Text>
      </View>

      {/* Right "Active" Green Pill */}
      <View style={styles.statusBadge}>
        <MaterialIcons
          name="check"
          size={14}
          color={colors.success}
          style={styles.checkIcon}
        />
        <Text style={styles.statusText}>Active</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: '#e8edff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e8edff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
    marginRight: spacing.xs,
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
    lineHeight: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf8f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#c6edd4',
  },
  checkIcon: {
    marginRight: 3,
  },
  statusText: {
    fontFamily: fonts.manropeBold,
    fontSize: 11,
    color: '#0d5c38',
  },
});