import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme';
import { APP_NAME, APP_VERSION, APP_TAGLINE } from '../../constants/app';

export default function AboutCard() {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconCircle}>
        <MaterialIcons name="two-wheeler" size={20} color={colors.primaryContainer} />
      </View>
      <Text style={styles.title}>About {APP_NAME}</Text>
      <Text style={styles.version}>{APP_NAME} • v{APP_VERSION}</Text>
      <Text style={styles.tagline}>{APP_TAGLINE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 4 },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18, marginBottom: 4,
    backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.7, color: colors.primary },
  version: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.onSurfaceVariant },
  tagline: { fontFamily: fonts.body, fontSize: 14, color: colors.outline, textAlign: 'center' },
});