import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts, spacing } from '../../constants/theme';

export default function SafeRideOSHeader() {
  return (
    <View style={styles.container}>
      {/* Left OS Status */}
      <View style={styles.leftGroup}>
        <View style={styles.dot} />
        <Text style={styles.osText}>SAFERIDE OS</Text>
      </View>

      {/* Right Health Indicator */}
      <Text style={styles.healthText}>SYSTEM OK</Text>
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
    width: '100%',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#041b3c',
    marginRight: 7,
  },
  osText: {
    fontFamily: fonts.manropeExtra,
    fontSize: 11,
    color: '#041b3c',
    letterSpacing: 1.0,
  },
  healthText: {
    fontFamily: fonts.manropeBold,
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 0.8,
  },
});