import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../../constants/theme';

// Small note at the bottom: "✓ Your safety matters"
export default function SafetyNote() {
  return (
    <View style={styles.pill}>
      <MaterialIcons name="verified-user" size={18} color={colors.secondary} />
      <Text style={styles.text}>Your safety matters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.lg,
    backgroundColor: colors.surfaceLow,
  },
  text: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.onSurfaceVariant },
});