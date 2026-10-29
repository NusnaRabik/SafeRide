import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

// Light-blue banner with a mint icon circle (top of the screen)
export default function InfoBanner({ icon = 'shield', title, text }) {
  return (
    <View style={styles.banner}>
      <View style={styles.iconCircle}>
        <MaterialIcons name={icon} size={22} color={colors.secondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: 'rgba(134,249,188,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.manropeBold, fontSize: 14, color: colors.primary, marginBottom: 4 },
  text: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
});