import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing, shadow } from '../../constants/theme';
import { MIN_PASSWORD_LENGTH } from '../../utils/validation';
import useRegister from '../../hooks/useRegister';

import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import AppButton from '../../components/common/AppButton';

const INPUT_SHAPE = { borderRadius: 14 };

export default function RegisterScreen({ navigation }) {
  const { register, loading, error } = useRegister();
  const [form, setForm] = useState({ fullName: '', identifier: '', password: '', confirmPassword: '' });
  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleRegister = async () => {
    const ok = await register(form);
    if (ok) {
      Alert.alert('Account created', 'You can now log in.', [
        { text: 'OK', onPress: () => navigation?.replace('Login') },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            <AuthHeader subtitle="Let's get you ready for safer rides." />

            <View style={styles.card}>
              <AuthInput
                label="Full Name"
                labelIcon="person-outline"
                placeholder="Enter your full name"
                autoCapitalize="words"
                autoComplete="name"
                value={form.fullName}
                onChangeText={(t) => update({ fullName: t })}
                style={INPUT_SHAPE}
              />
              <AuthInput
                label="Email / Phone"
                labelIcon="badge"
                placeholder="Enter email or mobile number"
                autoComplete="username"
                value={form.identifier}
                onChangeText={(t) => update({ identifier: t })}
                style={INPUT_SHAPE}
              />
              <AuthInput
                label="Password"
                labelIcon="lock"
                placeholder="Create password"
                secureTextEntry
                autoComplete="password-new"
                value={form.password}
                onChangeText={(t) => update({ password: t })}
                style={INPUT_SHAPE}
              />
              <AuthInput
                label="Confirm Password"
                labelIcon="lock"
                placeholder="Confirm password"
                secureTextEntry
                autoComplete="password-new"
                value={form.confirmPassword}
                onChangeText={(t) => update({ confirmPassword: t })}
                onSubmitEditing={handleRegister}
                style={INPUT_SHAPE}
              />

              <Text style={styles.hint}>Use at least {MIN_PASSWORD_LENGTH} characters.</Text>
              {!!error && <Text style={styles.error}>{error}</Text>}

              <AppButton
                label={loading ? 'Creating account…' : 'Create Account'}
                icon={loading ? undefined : 'arrow-forward'}
                iconPosition="right"
                variant="solid"
                onPress={handleRegister}
                disabled={loading}
                style={{ height: 52, borderRadius: 14, marginTop: spacing.xs }}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Login')} hitSlop={8}>
                <Text style={styles.link}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fd' },
  content: { flexGrow: 1, justifyContent: 'center' },
  inner: { width: '100%', maxWidth: 390, alignSelf: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.xl },
  card: {
    backgroundColor: colors.surfaceLowest,
    borderRadius: 26,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: '#f0f3fa',
    ...shadow,
  },
  hint: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, marginTop: -4 },
  error: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.error },
  footer: { marginTop: spacing.lg, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 6 },
  footerText: { fontFamily: fonts.body, fontSize: 14.5, color: '#4b5563' },
  link: { fontFamily: fonts.manropeBold, fontSize: 14.5, color: colors.primary },
});