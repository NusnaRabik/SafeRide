import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, shadow } from '../../constants/theme';
import { APP_NAME } from '../../constants/app';
import PulseDot from '../common/PulseDot';

// Small pill at the top: "● WELCOME TO SAFERIDE"
export default function WelcomeBadge() {
  return (
    <View style={styles.pill}>
      <PulseDot size={8} color={colors.secondary} />
      <Text style={styles.text}>{`Welcome to ${APP_NAME}`.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999,
    backgroundColor: colors.surfaceLowest, ...shadow,
  },
  text: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 1.2, color: colors.onSurfaceVariant },
});