import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import useLogin from '../../hooks/useLogin';

import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import AppButton from '../../components/common/AppButton';

export default function LoginScreen({ navigation }) {
  const { login, loading, error } = useLogin();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const ok = await login({ identifier, password });
    if (ok) {
      navigation?.replace('Main');
    }
  };

  const goForgotPassword = () => {
    // TODO: navigation.navigate('ForgotPassword')
  };

  const goCreateAccount = () => {
    navigation?.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            <AuthHeader subtitle="Sign in to continue your safer journey." />

            <View style={styles.card}>
              <AuthInput
                label="Email / Phone"
                labelIcon="badge"
                placeholder="Enter email or mobile number"
                value={identifier}
                onChangeText={setIdentifier}
                autoComplete="username"
                returnKeyType="next"
              />

              <AuthInput
                label="Password"
                labelIcon="lock"
                placeholder="••••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                rightLabel={
                  <TouchableOpacity onPress={goForgotPassword} hitSlop={8}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                  </TouchableOpacity>
                }
              />

              {!!error && <Text style={styles.error}>{error}</Text>}

              <AppButton
                label={loading ? 'Logging in…' : 'Login'}
                icon={loading ? undefined : 'arrow-forward'}
                iconPosition="right"
                variant="hero"
                onPress={handleLogin}
                disabled={loading}
                style={{ marginTop: spacing.xs }}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={goCreateAccount} hitSlop={8}>
                <Text style={styles.createLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  inner: { width: '100%', maxWidth: 448, alignSelf: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.lg },
  card: {
    backgroundColor: colors.surfaceLowest,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow,
  },
  forgot: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.outline },
  error: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.error },
  footer: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  footerText: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant },
  createLink: { fontFamily: fonts.manropeSemi, fontSize: 20, lineHeight: 28, color: colors.primaryContainer },
});