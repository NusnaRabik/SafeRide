import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../constants/theme';

export default function ConfirmedSafeCircle() {
  return (
    <View style={styles.container}>
      {/* Outer Glowing Concentric Ring */}
      <View style={styles.outerRing}>
        <View style={styles.innerCircle}>
          {/* Circular Checkmark Badge */}
          <View style={styles.checkBadge}>
            <MaterialIcons
              name="check"
              size={36}
              color={colors.success}
            />
          </View>

          {/* Reassurance Label */}
          <Text style={styles.label}>YOU'RE SAFE</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  outerRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: 'rgba(34, 160, 107, 0.25)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 3,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(34, 160, 107, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.manropeExtra,
    fontSize: 12,
    color: '#0d5c38',
    letterSpacing: 1.4,
  },
});