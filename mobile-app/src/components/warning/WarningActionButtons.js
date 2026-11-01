import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function WarningActionButtons({ onSafePress, onSosPress }) {
  return (
    <View style={styles.container}>
      {/* 1. Primary Action: I'M OK — I'M SAFE */}
      <TouchableOpacity
        style={styles.safeButton}
        onPress={onSafePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="I am safe"
      >
        <MaterialIcons
          name="check"
          size={20}
          color={colors.success}
          style={styles.checkIcon}
        />
        <Text style={styles.safeButtonText}>I'M OK — I'M SAFE</Text>
      </TouchableOpacity>

      {/* 2. Secondary Immediate SOS: SEND SOS NOW */}
      <TouchableOpacity
        style={styles.sosButton}
        onPress={onSosPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Send SOS immediately"
      >
        <Text style={styles.sosButtonText}>SOS  SEND SOS NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  safeButton: {
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
  checkIcon: {
    marginRight: 8,
  },
  safeButtonText: {
    fontFamily: fonts.manropeBold,
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  sosButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.2)',
    paddingVertical: 14,
    borderRadius: radius.xl,
  },
  sosButtonText: {
    fontFamily: fonts.manropeBold,
    fontSize: 13,
    color: colors.danger,
    letterSpacing: 0.8,
  },
});