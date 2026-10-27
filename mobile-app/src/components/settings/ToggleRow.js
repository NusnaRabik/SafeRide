import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../constants/theme';
import Toggle from '../common/Toggle';

export default function ToggleRow({ title, description, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Toggle value={value} onValueChange={onValueChange} label={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm },
  text: { flex: 1, paddingRight: spacing.xs },
  title: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.7, color: colors.primary },
  desc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant, marginTop: 2 },
});