import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ActiveRideHeader({ onBack, onProfilePress }) {
  return (
    <View style={styles.container}>
      {/* Left Back Arrow */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBack}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="Go back"
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
      </TouchableOpacity>

      {/* Brand & Active Status Badge */}
      <View style={styles.centerGroup}>
        <Text style={styles.brandTitle}>SafeRide</Text>
        <View style={styles.activeBadge}>
          <View style={styles.activeDot} />
          <Text style={styles.activeText}>Ride Active</Text>
        </View>
      </View>

      {/* Right Avatar Button */}
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={onProfilePress}
        activeOpacity={0.7}
        accessibilityLabel="Open profile"
      >
        <View style={styles.avatarInner}>
          <MaterialIcons name="person" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandTitle: {
    fontFamily: fonts.manropeBold,
    fontSize: 18,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 160, 107, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(34, 160, 107, 0.25)',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 5,
  },
  activeText: {
    fontFamily: fonts.manropeBold,
    fontSize: 11,
    color: '#0d5c38',
  },
  avatarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

