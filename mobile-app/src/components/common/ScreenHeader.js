import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, shadow } from '../../constants/theme';

// centered=false: title next to the back arrow (e.g. Emergency Contacts)
// centered=true : title in the middle of the bar (e.g. Ride History)
export default function ScreenHeader({ title, onBack, centered = false }) {
  if (centered) {
    return (
      <View style={[styles.header, { height: 56 }]}>
        <TouchableOpacity style={styles.backBtnCentered} onPress={onBack} accessibilityLabel="Back">
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.titleCentered}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>
    );
  }

  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack} accessibilityLabel="Back">
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    ...shadow,
  },
  backBtn: { width: 44, height: 44, marginLeft: -8, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: -0.2, color: colors.primary, marginLeft: 8 },
  backBtnCentered: { width: 40, height: 40, marginLeft: -8, alignItems: 'center', justifyContent: 'center' },
  titleCentered: { flex: 1, textAlign: 'center', fontFamily: fonts.manropeBold, fontSize: 16, color: colors.primary },
});