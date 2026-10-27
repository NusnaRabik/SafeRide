import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';

// White card with an info icon (bottom explanatory note)
export default function InfoNote({ title, text }) {
  return (
    <View style={styles.card}>
      <MaterialIcons name="info-outline" size={22} color={colors.primary} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surfaceLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginTop: 8,
    ...shadow,
  },
  title: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.primary, marginBottom: 4 },
  text: { fontFamily: fonts.body, fontSize: 14, lineHeight: 24, color: colors.onSurfaceVariant },
});