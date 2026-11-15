import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { COUNTRY_CODE } from '../../constants/profile';

export default function PhoneInput({
  label,
  value,
  onChangeText,
  placeholder,
  valid = false,
  error,
  onCountryPress,
}) {
  const showCheck = valid && !error;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable
          onPress={onCountryPress}
          style={({ pressed }) => [styles.countryPill, pressed && styles.pressed]}
        >
          <Text style={styles.countryText}>
            {COUNTRY_CODE.flag} {COUNTRY_CODE.dial}
          </Text>
          <MaterialIcons name="expand-more" size={16} color={theme.colors.outline} />
        </Pressable>

        <View style={[styles.inputWrap, error && styles.inputWrapError]}>
          <MaterialIcons name="phone" size={20} color={theme.colors.outline} />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.outline}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
          {showCheck && (
            <MaterialIcons name="check-circle" size={18} color={theme.colors.secondary} />
          )}
        </View>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.hint}>
        <MaterialIcons name="info-outline" size={14} color={theme.colors.onSurfaceVariant} />
        <Text style={styles.hintText}>Used for emergency SMS & verification alerts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { ...theme.typography.labelSm, color: theme.colors.onSurfaceVariant },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  countryPill: {
    height: 52,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceContainerLow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pressed: { opacity: 0.85 },
  countryText: {
    ...theme.typography.labelLg,
    color: theme.colors.onSurface,
    letterSpacing: 0.5,
  },
  inputWrap: {
    flex: 1,
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
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  hintText: { ...theme.typography.bodySm, color: theme.colors.onSurfaceVariant, fontSize: 12 },
});