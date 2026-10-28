import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing, shadow } from '../../constants/theme';
import { APP_NAME, APP_SLOGAN } from '../../constants/app';

import PingCircle from '../../components/common/PingCircle';
import BrandLogo from '../../components/auth/BrandLogo';
import WelcomeBadge from '../../components/auth/WelcomeBadge';
import SafetyNote from '../../components/auth/SafetyNote';

export default function WelcomeScreen({ navigation }) {
  // Tap anywhere to continue
  const handleContinue = () => {
    navigation?.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable style={styles.container} onPress={handleContinue} accessibilityLabel="Continue">
        {/* Radar backdrop */}
        <View style={styles.backdrop} pointerEvents="none">
          <PingCircle size={384} color="rgba(224,232,255,0.6)" duration={4000} />
          <View style={styles.staticCircle} />
        </View>

        <View style={styles.top}>
          <WelcomeBadge />
        </View>

        <View style={styles.center}>
          <View style={{ marginBottom: spacing.lg }}>
            <BrandLogo />
          </View>
          <Text style={styles.title}>{APP_NAME}</Text>
          <Text style={styles.tagline}>{APP_SLOGAN}</Text>

          {/* Pulse indicator */}
          <View style={styles.pulse}>
            <View style={styles.pulseWrap}>
              <PingCircle
                size={32}
                color="rgba(18,59,93,0.15)"
                duration={1800}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.pulseOuter}>
                <View style={styles.pulseInner} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <SafetyNote />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    overflow: 'hidden',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
  },
  staticCircle: {
    position: 'absolute',
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(232,237,255,0.7)',
  },
  top: { paddingTop: spacing.md, alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', maxWidth: 320 },
  title: { fontFamily: fonts.manropeBold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5, color: colors.primaryContainer },
  tagline: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    lineHeight: 26,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 260,
    marginTop: 4,
  },
  pulse: { marginTop: spacing.xl + spacing.md, alignItems: 'center' },
  pulseWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  pulseOuter: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: colors.surfaceLowest,
    alignItems: 'center', justifyContent: 'center', ...shadow,
  },
  pulseInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primaryContainer },
  bottom: { paddingBottom: spacing.sm, alignItems: 'center' },
});