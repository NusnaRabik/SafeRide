import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../constants/theme';
import AppButton from './AppButton';

export default function EmptyState({ icon, title, text, actionLabel, onAction }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconCircle}>
        <MaterialIcons name={icon} size={32} color={colors.onSurfaceVariant} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      {actionLabel && (
        <AppButton label={actionLabel} onPress={onAction} style={{ height: 44, paddingHorizontal: 24, marginTop: 8 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: spacing.md, gap: spacing.sm },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: fonts.manropeBold, fontSize: 20, color: colors.primary },
  text: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant, textAlign: 'center' },
});