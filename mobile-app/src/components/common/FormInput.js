import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../constants/theme';

export default function FormInput({ label, icon, ...inputProps }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrap}>
        <MaterialIcons name={icon} size={20} color={colors.onSurfaceVariant} style={styles.icon} />
        <TextInput style={styles.input} placeholderTextColor={colors.outline} {...inputProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurfaceVariant, marginTop: 8, marginBottom: 4 },
  wrap: { justifyContent: 'center' },
  icon: { position: 'absolute', left: 14, zIndex: 1 },
  input: {
    height: 52,
    paddingLeft: 44,
    paddingRight: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLowest,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.onSurface,
    ...shadow,
  },
});