import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '../../constants/theme';
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

  const handlePairHelmet = () => {
    // TODO: navigation.navigate('HelmetPairing') once the helmet screens exist
  };

  const handleSos = () => {
    // Confirmation first, so the button can't be pressed by accident
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
});