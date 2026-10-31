import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function RideSafetyTipCard() {
  return (
    <View style={styles.card}>
      {/* Rider / Safety Thumbnail Icon */}
      <View style={styles.iconWrap}>
        <MaterialIcons name="two-wheeler" size={24} color="#ffffff" />
      </View>

      {/* Text Info */}
      <View style={styles.textWrap}>
        <Text style={styles.badge}>RIDE SAFETY ACTIVE</Text>
        <Text style={styles.description}>
          Accident detection starts when you begin your ride.
        </Text>
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
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: '#e8edff',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  badge: {
    fontFamily: fonts.manropeExtra,
    fontSize: 10,
    color: colors.primaryContainer,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
});

