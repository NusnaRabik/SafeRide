import React from 'react';
import { ScrollView, View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import useCurrentUser from '../../hooks/useCurrentUser';
import useHelmet from '../../hooks/useHelmet';
import useContacts from '../../hooks/useContacts';
import HomeHeader from '../../components/home/HomeHeader';
import HelmetStatusCard from '../../components/home/HelmetStatusCard';
import ReadinessCard from '../../components/home/ReadinessCard';
import SosCard from '../../components/home/SosCard';

export default function HomeScreen({ navigation }) {
  const user = useCurrentUser();
  const helmet = useHelmet();
  const { contacts } = useContacts();

  // Pair Helmet → Pre-Ride Check (pair, verify internet + contact, then start the ride)
  const handlePairHelmet = () => {
    navigation?.navigate('PreRideCheck');
  };

  // Start Ride also goes through the safety checks first
  const handleStartRide = () => {
    navigation?.navigate('PreRideCheck');
  };

  const handleSos = () => {
    Alert.alert('Send emergency SOS?', 'Your emergency contacts will be alerted immediately.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send SOS',
        style: 'destructive',
        onPress: () => {
          // TODO: call the backend SOS endpoint (POST /incidents/sos) with the current location
        },
      },
    ]);
  };

  const checklist = [
    {
      key: 'helmet',
      icon: 'bluetooth',
      title: 'Helmet connected',
      subtitle: 'Bluetooth connection',
      done: helmet.connected,
      onPress: handlePairHelmet,
    },
    {
      key: 'contact',
      icon: 'shield-account-outline',
      iconFamily: 'community',
      title: 'Emergency contact added',
      subtitle: 'Trusted responder notice',
      done: contacts.length > 0,
      onPress: () => navigation?.navigate('EmergencyContacts'),
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <HomeHeader onProfilePress={() => navigation?.navigate('Profile')} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.greeting}>
          <View style={styles.greetingRow}>
            <Text style={styles.hi}>Hi, {user.name}</Text>
            <Text style={styles.wave}>👋</Text>
          </View>
          <Text style={styles.subtitle}>Let's get you ready for a safer ride.</Text>
        </View>

        {/* ── Start Ride CTA ── */}
        <Pressable
          style={({ pressed }) => [styles.startBtn, pressed && styles.startBtnPressed]}
          onPress={handleStartRide}
          accessibilityLabel="Start a new ride"
          accessibilityRole="button"
        >
          <View style={styles.startBtnLeft}>
            <View style={styles.startIconBox}>
              <MaterialIcons name="play-arrow" size={26} color={colors.onPrimary} />
            </View>
            <View>
              <Text style={styles.startBtnTitle}>Start Ride</Text>
              <Text style={styles.startBtnSub}>Begin monitoring your journey</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward" size={22} color={colors.onPrimaryContainer} />
        </Pressable>

        <HelmetStatusCard
          connected={helmet.connected}
          batteryPercent={helmet.batteryPercent}
          onPress={handlePairHelmet}
        />
        <ReadinessCard items={checklist} />
        <SosCard onPress={handleSos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.lg, gap: spacing.md },
  greeting: { paddingTop: spacing.xs },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  hi: { fontFamily: fonts.manropeBold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5, color: colors.primary },
  wave: { fontSize: 24 },
  subtitle: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant, marginTop: 2 },

  // Start Ride button
  startBtn: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow,
    elevation: 4,
  },
  startBtnPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
  startBtnLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  startIconBox: {
    width: 48, height: 48, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  startBtnTitle: { fontFamily: fonts.manropeBold, fontSize: 18, color: colors.onPrimary, letterSpacing: -0.2 },
  startBtnSub: { fontFamily: fonts.body, fontSize: 13, color: colors.onPrimaryContainer, marginTop: 1 },
});