import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ConfirmedSafeFooter({ helmetId = '#9042' }) {
  return (
    <View style={styles.container}>
      {/* 1. Reassurance Advisory Card */}
      <View style={styles.noteCard}>
        <MaterialIcons
          name="info-outline"
          size={18}
          color={colors.onSurfaceVariant}
          style={styles.icon}
        />
        <Text style={styles.noteText}>
          Your ride monitoring can continue. If you need emergency assistance later,
          you can use the SOS button.
        </Text>
      </View>

      {/* 2. Hardware / Firmware System Footer */}
      <Text style={styles.footerMeta}>
        SafeRide Helmet Crash Protection • SafeRide ID {helmetId}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#e8edff',
    width: '100%',
    marginBottom: spacing.lg,
  },
  icon: {
    marginRight: 8,
    marginTop: 1,
  },
  noteText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 17,
  },
  footerMeta: {
    fontFamily: fonts.manropeBold,
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

