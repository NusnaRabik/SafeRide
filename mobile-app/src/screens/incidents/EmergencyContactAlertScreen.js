import React, { useRef } from 'react';
import { ScrollView, View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import PulseDot from '../../components/incidents/PulseDot';

// Mock data for the frontend demo
const ALERT = {
  rider: { name: 'Kasun Perera', phone: '+94 77 234 5678' },
  incident: 'Possible motorcycle accident',
  place: 'Galle Road, Colombo 03',
  lat: 6.9271,
  lng: 79.8612,
};

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

function Row({ icon, label, value, first }) {
  return (
    <View style={[styles.row, !first && styles.rowBorder]}>
      <View style={styles.rowLabel}>
        {icon && <MaterialIcons name={icon} size={18} color={colors.primary} />}
        <Text style={styles.rowLabelText}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function EmergencyContactAlertScreen({ navigation }) {
  const when = useRef(new Date()).current;
  const date = when.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = when.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const coords = `${ALERT.lat.toFixed(4)}° N, ${ALERT.lng.toFixed(4)}° E`;

  const openDirections = () =>
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${ALERT.lat},${ALERT.lng}`);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Demo-only back button (remove if this screen is opened from a push notification) */}
      <Pressable style={styles.back} onPress={() => navigation?.goBack()} accessibilityLabel="Back">
        <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Alert header */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <PulseDot color={colors.error} size={80} maxScale={1.4} startOpacity={0.2} solid={false} style={styles.heroPulse} />
            <View style={styles.heroIcon}>
              <MaterialIcons name="warning" size={44} color={colors.error} />
            </View>
          </View>
          <Text style={styles.heroTitle}>MOTORCYCLE ACCIDENT ALERT</Text>
          <Text style={styles.heroSub}>An accident has been detected involving your emergency contact.</Text>
        </View>

        {/* Person involved */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PERSON INVOLVED</Text>
          <View style={styles.person}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials(ALERT.rider.name)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.personName} numberOfLines={1}>{ALERT.rider.name}</Text>
              <View style={styles.phoneRow}>
                <MaterialIcons name="phone" size={18} color={colors.primary} />
                <Text style={styles.phone}>{ALERT.rider.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Incident details */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardLabelPlain}>INCIDENT DETAILS</Text>
            <View style={styles.chip}>
              <Text style={styles.chipText}>LOCATION AVAILABLE</Text>
            </View>
          </View>
          <Row first label="Incident" value={ALERT.incident} />
          <Row label="Date" value={date} />
          <Row icon="schedule" label="Time" value={time} />
          <Row icon="pin-drop" label="Location" value={ALERT.place} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="info-outline" size={20} color={colors.onPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Emergency notification received</Text>
            <Text style={styles.infoText}>
              You are receiving this alert because you are listed as an emergency contact for this rider.
            </Text>
          </View>
        </View>

        {/* Map preview (placeholder: swap for react-native-maps later) */}
        <View style={[styles.card, { padding: 0, overflow: 'hidden', gap: 0 }]}>
          <View style={styles.map}>
            <MaterialIcons name="map" size={96} color="rgba(18,59,93,0.12)" style={StyleSheet.absoluteFill} />
            <View style={styles.pin}>
              <MaterialIcons name="navigation" size={24} color="#fff" />
            </View>
          </View>
          <View style={styles.mapBar}>
            <MaterialIcons name="location-on" size={20} color={colors.primary} />
            <Text style={styles.mapText} numberOfLines={1}>GPS: {coords} • {ALERT.place}</Text>
          </View>
        </View>

        {/* Directions */}
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          onPress={openDirections}
          accessibilityRole="button"
          accessibilityLabel="Get directions to the incident"
        >
          <MaterialIcons name="near-me" size={22} color={colors.onPrimary} />
          <Text style={styles.ctaText}>Get Directions</Text>
        </Pressable>
        <Text style={styles.ctaHint}>Opens maps navigation to the incident coordinates</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  back: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.lg },

  hero: { alignItems: 'center', gap: spacing.xs },
  heroIconWrap: { width: 80, height: 80, marginBottom: 4 },
  heroPulse: { position: 'absolute' },
  heroIcon: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: colors.errorContainer,
    alignItems: 'center', justifyContent: 'center', ...shadow,
  },
  heroTitle: { fontFamily: fonts.manropeBold, fontSize: 24, letterSpacing: -0.4, color: colors.onSurface, textAlign: 'center' },
  heroSub: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant, textAlign: 'center', maxWidth: 300 },

  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: spacing.md, gap: spacing.sm, ...shadow },
  cardLabel: {
    fontFamily: fonts.manropeBold, fontSize: 12, letterSpacing: 0.8, color: colors.onSurfaceVariant,
    paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: colors.surfaceContainer,
  },
  cardHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: colors.surfaceContainer,
  },
  cardLabelPlain: { fontFamily: fonts.manropeBold, fontSize: 12, letterSpacing: 0.8, color: colors.onSurfaceVariant },
  chip: { backgroundColor: 'rgba(134,249,188,0.4)', borderRadius: radius.lg, paddingHorizontal: 8, paddingVertical: 2 },
  chipText: { fontFamily: fonts.manropeBold, fontSize: 11, letterSpacing: 0.6, color: colors.secondary },

  person: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.manropeBold, fontSize: 18, color: colors.onPrimary },
  personName: { fontFamily: fonts.manropeBold, fontSize: 20, color: colors.onSurface },
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  phone: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6, gap: 12 },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.surfaceLow },
  rowLabel: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowLabelText: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
  rowValue: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.onSurface, flexShrink: 1, textAlign: 'right' },

  info: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, backgroundColor: colors.surfaceContainer,
    borderRadius: radius.xl, padding: spacing.md,
  },
  infoIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  infoTitle: { fontFamily: fonts.manropeBold, fontSize: 18, color: colors.onSurface },
  infoText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant, marginTop: 4 },

  map: { height: 176, backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  pin: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center', ...shadow,
  },
  mapBar: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs, padding: spacing.sm,
    backgroundColor: colors.surfaceContainer, borderTopWidth: 1, borderTopColor: colors.surfaceContainerHigh,
  },
  mapText: { flex: 1, fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurface },

  cta: {
    height: 56, borderRadius: radius.lg, backgroundColor: colors.primaryContainer,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, ...shadow, elevation: 4,
  },
  ctaText: { fontFamily: fonts.manropeBold, fontSize: 20, color: colors.onPrimary },
  ctaHint: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center', marginTop: -spacing.xs },
});