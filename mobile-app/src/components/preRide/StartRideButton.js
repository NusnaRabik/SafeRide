import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function StartRideButton({ disabled = false, onPress }) {
  return (
    <View style={styles.container}>
      {/* Primary Action Button */}
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Start ride"
      >
        <Text style={styles.buttonText}>START RIDE</Text>
        <MaterialIcons
          name="arrow-forward"
          size={20}
          color="#ffffff"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {/* Advisory Footnote */}
      <View style={styles.footnoteRow}>
        <MaterialIcons
          name="shield"
          size={14}
          color={colors.onSurfaceVariant}
          style={styles.footnoteIcon}
        />
        <Text style={styles.footnoteText}>
          Accident detection is active during your ride.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.outlineVariant,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontFamily: fonts.manropeBold,
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    marginLeft: spacing.xs,
  },
  footnoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  footnoteIcon: {
    marginRight: 6,
    opacity: 0.7,
  },
  footnoteText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});

