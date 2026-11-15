import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import useHelmet from '../../hooks/useHelmet';
import useContacts from '../../hooks/useContacts';

const ERROR_ON_CONTAINER = '#93000a';

function CheckRow({ icon, errorIcon, title, subtitle, errorTitle, errorSubtitle, ok, onPress, actionLabel, onAction, busy, actionSecondary }) {
  const Wrapper = ok && onPress ? Pressable : View;
  return (
    <Wrapper style={styles.row} {...(ok && onPress ? { onPress } : {})}>
      <View style={styles.rowLeft}>
        <View style={[styles.rowIcon, !ok && styles.rowIconError]}>
          <MaterialIcons name={ok ? icon : errorIcon || icon} size={24} color={ok ? colors.primary : colors.error} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle} numberOfLines={1}>{ok ? title : errorTitle}</Text>
          <Text style={styles.rowSub} numberOfLines={2}>{ok ? subtitle : errorSubtitle}</Text>
        </View>
      </View>

      {ok ? (
        <View style={styles.okBadge}>
          <MaterialIcons name="check" size={20} color={colors.secondary} />
        </View>
      ) : (
        <Pressable
          onPress={onAction}
          disabled={busy}
          style={({ pressed }) => [
            styles.actionBtn,
            actionSecondary && styles.actionBtnSecondary,
            (pressed || busy) && { opacity: 0.8 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          {busy ? (
            <ActivityIndicator size="small" color={actionSecondary ? colors.primary : colors.onPrimary} />
          ) : (
            <Text style={[styles.actionText, actionSecondary && { color: colors.primary }]}>{actionLabel}</Text>
          )}
        </Pressable>
      )}
    </Wrapper>
  );
}

export default function PreRideCheckScreen({ navigation }) {
  const helmet = useHelmet();
  const { contacts } = useContacts();

  // null = follow the real hook value; true/false = demo override
  const [helmetOverride, setHelmetOverride] = useState(null);
  const [contactOverride, setContactOverride] = useState(null);
  const [internetOk, setInternetOk] = useState(true);
  const [pairing, setPairing] = useState(false);
  const [checkingNet, setCheckingNet] = useState(false);
  const [starting, setStarting] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const helmetOk = helmetOverride ?? !!helmet.connected;
  const contactOk = contactOverride ?? contacts.length > 0;
  const allOk = helmetOk && internetOk && contactOk;

  // Home / Profile are tabs inside "Main", so target the nested screen explicitly
  const goHome = () => navigation.navigate('Main', { screen: 'Home' });
  const openProfile = () => navigation.navigate('Main', { screen: 'Profile' });

  // Simulated pairing (TODO backend/BLE phase: real Bluetooth pairing)
  const handlePair = () => {
    setPairing(true);
    later(() => {
      setHelmetOverride(true);
      setPairing(false);
    }, 1200);
  };

  // Simulated internet re-check (TODO: use NetInfo later)
  const handleCheckInternet = () => {
    setCheckingNet(true);
    later(() => {
      setInternetOk(true);
      setCheckingNet(false);
    }, 900);
  };

  const showReady = () => {
    setHelmetOverride(true);
    setContactOverride(true);
    setInternetOk(true);
  };
  const showIssues = () => {
    setHelmetOverride(false);
    setContactOverride(false);
    setInternetOk(false);
  };

  const handleStart = () => {
    if (!allOk || starting) return;
    setStarting(true);
    later(() => navigation.replace('ActiveRide'), 600);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* App bar: back + avatar (title is in the body, avoids a duplicate heading) */}
      <View style={styles.appBar}>
        <Pressable
          style={styles.backBtn}
          onPress={goHome}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.avatar, pressed && { opacity: 0.8 }]}
          onPress={openProfile}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <MaterialIcons name="person" size={18} color={colors.onPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 2 }}>
          <Text style={styles.heading}>Pre-Ride Check</Text>
          <Text style={styles.subtitle}>Make sure everything is ready before your ride.</Text>
        </View>

        {/* Demo toggle */}
        <View style={styles.segment}>
          <Pressable style={[styles.segBtn, allOk && styles.segBtnActive]} onPress={showReady}>
            <MaterialIcons name="check-circle" size={18} color={colors.secondary} />
            <Text style={[styles.segText, allOk && styles.segTextActive]}>Ready to Ride</Text>
          </Pressable>
          <Pressable style={[styles.segBtn, !allOk && styles.segBtnActive]} onPress={showIssues}>
            <MaterialIcons name="warning" size={18} color={colors.error} />
            <Text style={[styles.segText, !allOk && styles.segTextActive]}>Check Issues</Text>
          </Pressable>
        </View>

        {/* Status banner */}
        {allOk ? (
          <View style={[styles.banner, { backgroundColor: 'rgba(134,249,188,0.3)' }]}>
            <View style={[styles.bannerIcon, { backgroundColor: colors.secondaryContainer }]}>
              <MaterialIcons name="verified" size={26} color="#002112" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.bannerTitleRow}>
                <Text style={[styles.bannerTitle, { color: colors.secondary }]}>Ready to Ride</Text>
                <MaterialIcons name="done" size={20} color={colors.secondary} />
              </View>
              <Text style={[styles.bannerSub, { color: '#005233' }]}>Your safety checks are complete.</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.banner, { backgroundColor: colors.errorContainer, alignItems: 'flex-start' }]}>
            <View style={[styles.bannerIcon, { backgroundColor: colors.tertiaryContainer, borderRadius: radius.lg, width: 44, height: 44 }]}>
              <MaterialIcons name="warning" size={24} color={colors.onError} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={[styles.bannerTitle, { color: ERROR_ON_CONTAINER }]}>Not Ready Yet</Text>
              <Text style={[styles.bannerSub, { color: colors.onSurfaceVariant }]}>
                Complete the required checks before starting your ride.
              </Text>
            </View>
          </View>
        )}

        {/* Checklist */}
        <View style={styles.card}>
          <CheckRow
            icon="sports-motorsports"
            title="Helmet Connected"
            subtitle="SafeRide helmet connected to your phone"
            errorTitle="Helmet Not Connected"
            errorSubtitle="Pair your SafeRide helmet before starting your ride."
            ok={helmetOk}
            actionLabel="Pair Helmet"
            onAction={handlePair}
            busy={pairing}
          />
          <View style={styles.divider} />
          <CheckRow
            icon="wifi"
            errorIcon="wifi-off"
            title="Internet Connection"
            subtitle="Needed to send emergency alerts"
            errorTitle="No Internet Connection"
            errorSubtitle="Connect your phone so emergency alerts can be sent."
            ok={internetOk}
            actionLabel="Check Internet"
            actionSecondary
            onAction={handleCheckInternet}
            busy={checkingNet}
          />
          <View style={styles.divider} />
          <CheckRow
            icon="contact-emergency"
            errorIcon="person-off"
            title="Emergency Contact Added"
            subtitle="Your selected emergency contact"
            errorTitle="Emergency Contact Missing"
            errorSubtitle="Add an emergency contact before starting your ride."
            ok={contactOk}
            onPress={() => navigation.navigate('EmergencyContacts')}
            actionLabel="Add Contact"
            onAction={() => navigation.navigate('EmergencyContacts')}
          />
        </View>

        {/* Info card */}
        {allOk && (
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="sports-motorsports" size={30} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>RIDE SAFETY ACTIVE</Text>
              <Text style={styles.infoText} numberOfLines={2}>Accident detection starts when you begin your ride.</Text>
            </View>
          </View>
        )}

        {/* Start button */}
        <View style={{ paddingTop: spacing.xs }}>
          <Pressable
            onPress={handleStart}
            disabled={!allOk || starting}
            style={({ pressed }) => [
              styles.startBtn,
              !allOk && styles.startBtnDisabled,
              pressed && allOk && { opacity: 0.92, transform: [{ scale: 0.98 }] },
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !allOk }}
            accessibilityLabel={allOk ? 'Start ride' : 'Complete checks to start'}
          >
            {starting ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <>
                {!allOk && <MaterialIcons name="lock" size={22} color={colors.onSurfaceVariant} />}
                <Text style={[styles.startText, !allOk && { color: colors.onSurfaceVariant }]}>
                  {allOk ? 'START RIDE' : 'COMPLETE CHECKS TO START'}
                </Text>
                {allOk && <MaterialIcons name="arrow-forward" size={24} color={colors.onPrimary} />}
              </>
            )}
          </Pressable>

          <View style={styles.footNote}>
            <MaterialIcons name={allOk ? 'shield' : 'info'} size={16} color={allOk ? colors.onSurfaceVariant : colors.error} />
            <Text style={[styles.footText, !allOk && { color: colors.error }]}>
              {allOk ? 'Accident detection is active during your ride.' : 'Complete all safety checks to enable ride tracking'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  appBar: {
    height: 56, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },

  content: { paddingHorizontal: spacing.md, paddingBottom: 48, gap: spacing.lg },
  heading: { fontFamily: fonts.manropeBold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5, color: colors.primary },
  subtitle: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant },

  segment: { flexDirection: 'row', backgroundColor: colors.surfaceContainerHigh, padding: 4, borderRadius: radius.xl, ...shadow },
  segBtn: {
    flex: 1, paddingVertical: 8, borderRadius: radius.lg, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
  },
  segBtnActive: { backgroundColor: colors.surfaceLowest, ...shadow },
  segText: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.4, color: colors.onSurfaceVariant },
  segTextActive: { color: colors.primary },

  banner: { borderRadius: radius.xl, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  bannerIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  bannerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bannerTitle: { fontFamily: fonts.manropeSemi, fontSize: 20, lineHeight: 28 },
  bannerSub: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },

  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: spacing.md, gap: spacing.md, ...shadow },
  divider: { height: 1, backgroundColor: colors.surfaceContainerHigh },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 52, gap: 8 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  rowIcon: { width: 44, height: 44, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  rowIconError: { backgroundColor: colors.errorContainer },
  rowTitle: { fontFamily: fonts.manropeSemi, fontSize: 16.5, color: colors.primary },
  rowSub: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.onSurfaceVariant },
  okBadge: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(134,249,188,0.5)', alignItems: 'center', justifyContent: 'center',
  },
  actionBtn: {
    minWidth: 92, minHeight: 34, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.lg,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  actionBtnSecondary: { backgroundColor: colors.surfaceContainerHigh },
  actionText: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.4, color: colors.onPrimary },

  infoCard: {
    backgroundColor: colors.surfaceLow, borderRadius: radius.xl, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
  },
  infoIcon: {
    width: 64, height: 64, borderRadius: radius.lg, backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: { fontFamily: fonts.manropeBold, fontSize: 12, letterSpacing: 0.5, color: colors.primary },
  infoText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant },

  startBtn: {
    height: 64, borderRadius: radius.xl, backgroundColor: colors.primaryContainer,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, ...shadow, elevation: 4,
  },
  startBtnDisabled: { backgroundColor: colors.surfaceContainerHigh, elevation: 0, shadowOpacity: 0, opacity: 0.8 },
  startText: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: 0.8, color: colors.onPrimary },
  footNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.sm },
  footText: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.4, color: colors.onSurfaceVariant, flexShrink: 1, textAlign: 'center' },
});