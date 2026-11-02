import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../../constants/theme';

// Labeled input for the auth screens.
// - labelIcon: small icon before the label
// - rightLabel: optional element shown on the right of the label row (e.g. "Forgot Password?")
// - secureTextEntry: adds a show/hide eye button
export default function AuthInput({ label, labelIcon, rightLabel, secureTextEntry, style, ...inputProps }) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={{ gap: 4 }}>
      <View style={styles.labelRow}>
        <View style={styles.labelLeft}>
          <MaterialIcons name={labelIcon} size={18} color={colors.outline} />
          <Text style={styles.label}>{label}</Text>
        </View>
        {rightLabel}
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={[
            styles.input,
            secureTextEntry && { paddingRight: 48 },
            focused && styles.inputFocused,
            style,
          ]}
          placeholderTextColor={colors.outline}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setHidden((h) => !h)}
            accessibilityLabel="Toggle password visibility"
          >
            <MaterialIcons name={hidden ? 'visibility' : 'visibility-off'} size={20} color={colors.outline} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  labelLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  label: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.7, color: colors.onSurface },
  inputWrap: { justifyContent: 'center' },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLow,
    borderWidth: 2,
    borderColor: 'transparent',
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.onSurface,
  },
  inputFocused: { backgroundColor: colors.surfaceLowest, borderColor: colors.primaryContainer },
  eye: { position: 'absolute', right: 12, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});