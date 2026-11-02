import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../constants/theme';
import { APP_NAME } from '../../constants/app';
import AppIcon from './AppIcon';

// Logo + app name + subtitle. Reused by Login / Register / Forgot Password.
// The logo comes from AppIcon, so changing it there updates every screen.
export default function AuthHeader({ subtitle }) {
  return (
    <View style={styles.wrap}>
      <View style={{ marginBottom: spacing.sm }}>
        <AppIcon size={72} />
      </View>
      <Text style={styles.title}>{APP_NAME}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.xl },
  title: { fontFamily: fonts.manropeBold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5, color: colors.primary },
  subtitle: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant, marginTop: 4, textAlign: 'center' },
});