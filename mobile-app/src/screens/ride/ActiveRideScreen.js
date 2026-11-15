import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import { APP_NAME } from '../../constants/app';
import { USE_NATIVE_DRIVER } from '../../constants/animation';
import AppIcon from '../../components/auth/AppIcon';
import StatusPill from '../../components/common/StatusPill';
import ConfirmModal from '../../components/common/ConfirmModal';

// ─── Helpers ────────────────────────────────────────────────────────────────

function padTwo(n) {
  return String(n).padStart(2, '0');
}

function formatElapsed(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${padTwo(h)}:${padTwo(m)}:${padTwo(s)}`;
  return `${padTwo(m)}:${padTwo(s)}`;
}

// Mock distance: ~0.4 km per minute — replace with real GPS later
function mockDistanceKm(seconds) {
  return ((seconds / 60) * 0.4).toFixed(1);
}

// ─── MetricCell (inline, reusable telemetry tile) ───────────────────────────

function MetricCell({ icon, label, value, unit, sublabel }) {
  return (
    <View style={cellStyles.cell}>
      <View style={cellStyles.labelRow}>
        <MaterialIcons name={icon} size={18} color={colors.onSurfaceVariant} />
        <Text style={cellStyles.label}>{label}</Text>
      </View>
      <View style={cellStyles.valueRow}>
        <Text style={cellStyles.value}>{value}</Text>
        {!!unit && <Text style={cellStyles.unit}>{unit}</Text>}
      </View>
      {!!sublabel && <Text style={cellStyles.sub}>{sublabel}</Text>}
    </View>
  );
}

const cellStyles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: colors.surfaceLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    gap: 4,
    ...shadow,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: {
    fontFamily: fonts.manropeSemi,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  value: {
    fontFamily: fonts.manropeExtra,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: colors.primary,
  },
  unit: {
    fontFamily: fonts.manropeBold,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sub: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 1 },
});

// ─── SOS Hold Button ─────────────────────────────────────────────────────────

const SOS_HOLD_MS = 3000;

function SosHoldButton({ onHoldComplete }) {
  const progress = useRef(new Animated.Value(0)).current;
  const holdAnim = useRef(null);
  const [holding, setHolding] = useState(false);

  const startHold = useCallback(() => {
    setHolding(true);
    holdAnim.current = Animated.timing(progress, {
      toValue: 1,
      duration: SOS_HOLD_MS,
      useNativeDriver: false, // width % can't use native driver
    });
    holdAnim.current.start(({ finished }) => {
      if (finished) {
        onHoldComplete?.();
        progress.setValue(0);
        setHolding(false);
      }
    });
  }, [progress, onHoldComplete]);

  const cancelHold = useCallback(() => {
    holdAnim.current?.stop();
    setHolding(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={sosStyles.wrap}>
      <Pressable
        style={[sosStyles.btn, holding && sosStyles.btnHolding]}
        onPressIn={startHold}
        onPressOut={cancelHold}
        accessible
        accessibilityLabel="Emergency SOS — press and hold for 3 seconds"
        accessibilityRole="button"
      >
        {/* hold-progress fill */}
        <Animated.View
          style={[sosStyles.progressFill, { width: progressWidth }]}
          pointerEvents="none"
        />
        <View style={sosStyles.content}>
          <MaterialIcons name="sos" size={28} color={colors.onError} />
          <Text style={sosStyles.label}>
            {holding ? 'Keep Holding…' : 'SOS — Press & Hold'}
          </Text>
        </View>
      </Pressable>
      <Text style={sosStyles.hint}>Hold for 3 seconds to alert your emergency contacts.</Text>
    </View>
  );
}

const sosStyles = StyleSheet.create({
  wrap: { gap: 6 },
  btn: {
    minHeight: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.error,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow,
    elevation: 6,
  },
  btnHolding: { opacity: 0.9 },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.tertiaryContainer,
    opacity: 0.85,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontFamily: fonts.manropeBold,
    fontSize: 18,
    color: colors.onError,
    letterSpacing: 0.5,
  },
  hint: {
    fontFamily: fonts.manropeSemi,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function ActiveRideScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const intervalRef = useRef(null);

  // Start the ride timer when the screen mounts
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const elapsed = formatElapsed(seconds);
  const distanceKm = mockDistanceKm(seconds);

  const handleEndRide = useCallback(() => {
    setEndModalVisible(true);
  }, []);

  const confirmEndRide = useCallback(() => {
  clearInterval(intervalRef.current);
  setEndModalVisible(false);

  // Reset navigation history for the completed ride flow
  navigation?.reset({
    index: 1,
    routes: [
      { name: 'PreRideCheck' },
      { name: 'RideHistory' },
    ],
  });
}, [navigation]);

  const handleSosComplete = useCallback(() => {
    // Navigate to SOS sent screen (to be built next)
    navigation?.navigate('EmergencyNotificationSent');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AppIcon size={28} shadowed={false} />
          <View>
            <Text style={styles.brand}>{APP_NAME}</Text>
            <Text style={styles.headerSub}>Active Ride</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <StatusPill label="Ride Active" tone="success" pulse />
          <Pressable
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
            accessibilityLabel="Open profile"
            accessibilityRole="button"
          >
            <MaterialIcons name="person" size={16} color={colors.onPrimary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Status Row: Helmet + Accident Monitoring ── */}
        <View style={styles.statusRow}>
          <View style={styles.statusChip}>
            <MaterialIcons name="sports-motorsports" size={18} color={colors.secondary} />
            <Text style={styles.statusChipText}>Helmet Connected</Text>
          </View>
          <View style={styles.statusChip}>
            <MaterialIcons name="security" size={18} color={colors.secondary} />
            <Text style={styles.statusChipText} numberOfLines={1}>Accident Monitoring Active</Text>
          </View>
        </View>

        {/* ── Hero Timer Card ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroLabel}>
            <MaterialIcons name="schedule" size={16} color={colors.primary} />
            <Text style={styles.heroLabelText}>YOUR RIDE</Text>
          </View>
          <Text style={styles.heroTimer}>{elapsed}</Text>
          <Text style={styles.heroSub}>Ride Duration</Text>
          <Text style={styles.heroHint}>Your ride is in progress.</Text>
        </View>

        {/* ── Metric Cells: Ride Time + Distance ── */}
        <View style={styles.metricsRow}>
          <MetricCell
            icon="timer"
            label="Ride Time"
            value={elapsed}
            sublabel="Current ride duration"
          />
          <MetricCell
            icon="route"
            label="Distance"
            value={distanceKm}
            unit="km"
            sublabel="Distance travelled"
          />
        </View>

        {/* ── Helmet / Safety Monitoring Card ── */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyLeft}>
            <View style={styles.safetyIconBox}>
              <MaterialIcons name="health-and-safety" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.safetyTitle}>Safety Monitoring</Text>
              <Text style={styles.safetySub}>
                Your connected helmet is monitoring for potential accidents.
              </Text>
            </View>
          </View>
          <View style={styles.safetyActivePill}>
            <MaterialIcons name="check-circle" size={16} color={colors.secondary} />
            <Text style={styles.safetyActiveText}>Active</Text>
          </View>
        </View>

        {/* ── Actions ── */}
        <View style={styles.actions}>
          {/* End Ride */}
          <View style={styles.endRideWrap}>
            <Pressable
              style={({ pressed }) => [styles.endBtn, pressed && styles.endBtnPressed]}
              onPress={handleEndRide}
              accessibilityLabel="End ride"
              accessibilityRole="button"
            >
              <MaterialIcons name="stop-circle" size={22} color={colors.onPrimary} />
              <Text style={styles.endBtnText}>End Ride</Text>
            </Pressable>
            <Text style={styles.endBtnHint}>Tap to confirm ending ride</Text>
          </View>

          {/* SOS Hold */}
          <SosHoldButton onHoldComplete={handleSosComplete} />
        </View>
      </ScrollView>

      {/* ── End Ride Confirmation Modal ── */}
      <ConfirmModal
        visible={endModalVisible}
        icon="flag"
        iconBg={colors.surfaceContainerHigh}
        iconColor={colors.primary}
        title="End this ride?"
        message="Your ride summary will be saved."
        cancelLabel="Continue Ride"
        confirmLabel="End Ride"
        confirmStyle="neutral"
        onCancel={() => setEndModalVisible(false)}
        onConfirm={confirmEndRide}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    height: 64,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    ...shadow,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  brand: {
    fontFamily: fonts.manropeSemi,
    fontSize: 18,
    letterSpacing: -0.2,
    color: colors.primary,
    lineHeight: 22,
  },
  headerSub: {
    fontFamily: fonts.manropeSemi,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.onSurfaceVariant,
    lineHeight: 14,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll content
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },

  // Status row
  statusRow: { flexDirection: 'row', gap: spacing.xs },
  statusChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(134,249,188,0.4)',
  },
  statusChipText: {
    fontFamily: fonts.manropeBold,
    fontSize: 11,
    color: colors.secondary,
    letterSpacing: 0.3,
    flexShrink: 1,
  },

  // Hero timer card
  heroCard: {
    backgroundColor: colors.surfaceLowest,
    borderRadius: radius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: 4,
    ...shadow,
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceLow,
    marginBottom: spacing.xs,
  },
  heroLabelText: {
    fontFamily: fonts.manropeSemi,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  heroTimer: {
    fontFamily: fonts.manropeExtra,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -2,
    color: colors.primary,
  },
  heroSub: {
    fontFamily: fonts.manropeBold,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  heroHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.outline,
    marginTop: 2,
  },

  // Metrics row
  metricsRow: { flexDirection: 'row', gap: spacing.xs },

  // Safety monitoring card
  safetyCard: {
    backgroundColor: colors.surfaceLowest,
    borderRadius: radius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    ...shadow,
  },
  safetyLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  safetyIconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  safetyTitle: {
    fontFamily: fonts.manropeBold,
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  safetySub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 17,
    marginTop: 2,
  },
  safetyActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: 'rgba(134,249,188,0.5)',
    flexShrink: 0,
  },
  safetyActiveText: {
    fontFamily: fonts.manropeBold,
    fontSize: 12,
    color: colors.secondary,
    letterSpacing: 0.3,
  },

  // Actions section
  actions: { gap: spacing.md, paddingTop: spacing.xs },

  // End Ride button
  endRideWrap: { gap: 6 },
  endBtn: {
    minHeight: 58,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    ...shadow,
    elevation: 4,
  },
  endBtnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  endBtnText: {
    fontFamily: fonts.manropeBold,
    fontSize: 18,
    color: colors.onPrimary,
    letterSpacing: 0.2,
  },
  endBtnHint: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
