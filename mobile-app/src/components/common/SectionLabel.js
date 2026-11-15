import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/theme';

export default function SectionLabel({ children }) {
  return <Text style={styles.label}>{String(children).toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5,
    color: colors.onSurfaceVariant, paddingHorizontal: 4,
  },
});