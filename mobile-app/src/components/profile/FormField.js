import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function FormField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  valid = false,
  error,
  ...inputProps
}) {
  const showCheck = valid && !error;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrap, error && styles.inputWrapError]}>
        <MaterialIcons name={icon} size={20} color={theme.colors.outline} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.outline}
          {...inputProps}
        />
        {showCheck && (
          <MaterialIcons name="check-circle" size={18} color={theme.colors.secondary} />
        )}
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { ...theme.typography.labelSm, color: theme.colors.onSurfaceVariant },
  inputWrap: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceContainerLow,
  },
  inputWrapError: { borderWidth: 1, borderColor: theme.colors.error },
  input: {
    flex: 1,
    ...theme.typography.bodyMd,
    color: theme.colors.onSurface,
    padding: 0,
  },
  errorText: { ...theme.typography.labelSm, color: theme.colors.error },
});