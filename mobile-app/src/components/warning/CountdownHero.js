import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../constants/theme';

export default function CountdownHero({ seconds = 30 }) {
  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  return (
    <View style={styles.container}>

      {/* Outer Circular Progress Ring */}
      <View style={styles.outerRing}>
        <View style={styles.innerCircle}>
            
          {/* Giant Countdown Digits */}
          <Text style={styles.digits}>{pad(seconds)}</Text>

          {/* Sub-label */}
          <Text style={styles.label}>SECONDS REMAINING</Text>
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
    borderColor: 'rgba(220, 38, 38, 0.22)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  digits: {
    fontFamily: fonts.manropeExtra,
    fontSize: 54,
    color: colors.danger,
    letterSpacing: -1,
    lineHeight: 60,
  },
  label: {
    fontFamily: fonts.manropeExtra,
    fontSize: 10,
    color: colors.danger,
    letterSpacing: 1.2,
    marginTop: 2,
    opacity: 0.85,
  },
});