import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, Pressable, Animated, Easing, Vibration, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import PulseDot from '../../components/incidents/PulseDot';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const TOTAL_SECONDS = 15;
const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const RING = 256;

export default function AccidentWarningScreen({ navigation }) {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const progress = useRef(new Animated.Value(1)).current;
  const resolved = useRef(false);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0, duration: TOTAL_SECONDS * 1000, easing: Easing.linear, useNativeDriver: false,
    }).start();
    Vibration.vibrate([0, 500, 500], true);
    const id = setInterval(() => setSeconds((s) => Math.max(s - 1, 0)), 1000);
    // The alert must not be dismissed by accident with the Android back button
    const back = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      clearInterval(id);
      Vibration.cancel();
      back.remove();
      progress.stopAnimation();
    };
  }, [progress]);

  const finish = useCallback(
    (route) => {
      if (resolved.current) return;
      resolved.current = true;
      Vibration.cancel();
      navigation.replace(route);
    },
    [navigation]
  );

  // No response before the countdown ends -> alert contacts
  useEffect(() => {
    if (seconds === 0) {
      // TODO (backend phase): POST /incidents with location + sensor data
      finish('EmergencyNotificationSent');
    }
  }, [seconds, finish]);

  const dashOffset = progress.interpolate({ inputRange: [0, 1], outputRange: [CIRCUMFERENCE, 0] });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Alert banner */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIcon}>
              <MaterialIcons name="warning" size={18} color={colors.onError} />
            </View>
            <Text style={styles.bannerText}>POSSIBLE ACCIDENT DETECTED</Text>
          </View>
          <PulseDot color={colors.error} size={12} />
        </View>

        {/* Heading */}
        <View style={styles.heading}>
          <Text style={styles.small}>Unusual movement detected by your SafeRide helmet.</Text>
          <Text style={styles.title}>Are you OK?</Text>
          <Text style={styles.smaller}>Confirm that you’re safe before the countdown ends.</Text>
        </View>

        {/* Countdown ring */}
        <View style={styles.ringWrap}>
          <PulseDot
            color={colors.error} size={224} maxScale={1.15} startOpacity={0.12} solid={false}
            style={styles.aura}
          />
          <View style={styles.ring}>
            <Svg width={RING} height={RING} viewBox="0 0 100 100" style={styles.svg}>
              <Circle cx="50" cy="50" r={RADIUS} stroke={colors.errorContainer} strokeWidth={8} fill="none" />
              <AnimatedCircle
                cx="50" cy="50" r={RADIUS} stroke={colors.error} strokeWidth={8} fill="none"
                strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset}
              />
            </Svg>
            <Text style={styles.count}>{String(seconds).padStart(2, '0')}</Text>
            <Text style={styles.countLabel}>SECONDS REMAINING</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.okBtn, pressed && styles.pressed]}
            onPress={() => finish('RiderConfirmedSafe')}
            accessibilityRole="button"
            accessibilityLabel="I'm OK, I'm safe"
          >
            <MaterialIcons name="check-circle" size={24} color={colors.secondaryContainer} />
            <Text style={styles.okText}>I’M OK — I’M SAFE</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.sosBtn, pressed && styles.pressed]}
            onPress={() => finish('EmergencyNotificationSent')}
            accessibilityRole="button"
            accessibilityLabel="Send SOS now"
          >
            <MaterialIcons name="sos" size={22} color={colors.error} />
            <Text style={styles.sosText}>SEND SOS NOW</Text>
          </Pressable>
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <MaterialIcons name="contact-emergency" size={18} color={colors.error} style={{ marginTop: 2 }} />
          <Text style={styles.noticeText}>
            If you don’t respond before the countdown ends, SafeRide will automatically send an emergency alert to
            your saved emergency contacts when the service is available.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.lg, gap: spacing.md },

  banner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(255,218,214,0.4)', borderRadius: radius.xl, padding: spacing.md, ...shadow,
  },
  bannerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flexShrink: 1 },
  bannerIcon: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center',
  },
  bannerText: { fontFamily: fonts.manropeBold, fontSize: 13, letterSpacing: 0.7, color: colors.error, flexShrink: 1 },

  heading: { alignItems: 'center', gap: 4 },
  small: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center' },
  title: { fontFamily: fonts.manropeExtra, fontSize: 56, lineHeight: 62, letterSpacing: -1.6, color: colors.onSurface },
  smaller: { fontFamily: fonts.body, fontSize: 12, color: colors.onSurfaceVariant, marginTop: 4, textAlign: 'center' },

  ringWrap: { alignItems: 'center', justifyContent: 'center', marginVertical: spacing.md },
  aura: { position: 'absolute' },
  ring: {
    width: RING, height: RING, borderRadius: RING / 2, backgroundColor: colors.surfaceLowest,
    alignItems: 'center', justifyContent: 'center', ...shadow,
  },
  svg: { position: 'absolute', transform: [{ rotate: '-90deg' }] },
  count: { fontFamily: fonts.manropeExtra, fontSize: 64, lineHeight: 70, letterSpacing: -2, color: colors.error },
  countLabel: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 1.6, color: colors.onSurfaceVariant, marginTop: 8 },

  actions: { gap: spacing.md, marginTop: spacing.xs },
  okBtn: {
    backgroundColor: colors.primary, borderRadius: radius.xl, paddingVertical: spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, ...shadow, elevation: 6,
  },
  okText: { fontFamily: fonts.manropeBold, fontSize: 22, letterSpacing: -0.4, color: colors.onPrimary },
  sosBtn: {
    backgroundColor: colors.surfaceContainer, borderRadius: radius.xl, paddingVertical: spacing.sm,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
  },
  sosText: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.8, color: colors.onSurfaceVariant },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },

  notice: {
    flexDirection: 'row', gap: 10, backgroundColor: colors.surfaceLow, borderRadius: radius.xl, padding: 12,
  },
  noticeText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 19, color: colors.onSurfaceVariant },
});