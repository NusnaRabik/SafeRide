import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '../../constants/theme';
import useSettings from '../../hooks/useSettings';

import SectionLabel from '../../components/common/SectionLabel';
import SectionCard from '../../components/common/SectionCard';
import ToggleRow from '../../components/settings/ToggleRow';
import PermissionRow from '../../components/settings/PermissionRow';
import LinkRow from '../../components/settings/LinkRow';
import AboutCard from '../../components/settings/AboutCard';

export default function SettingsScreen({ navigation }) {
  const { settings, setSetting } = useSettings();

  const openSystemSettings = () => Linking.openSettings();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Back button row */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()} accessibilityLabel="Back">
        <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.heading}>Settings</Text>
          <Text style={styles.subtitle}>Manage notification preferences, app permissions, and account privacy.</Text>
        </View>

        <View style={styles.section}>
          <SectionLabel>Notifications</SectionLabel>
          <SectionCard>
            <ToggleRow
              title="Emergency Alerts"
              description="Receive notifications about accident alerts and SOS events."
              value={settings.emergencyAlerts}
              onValueChange={(v) => setSetting('emergencyAlerts', v)}
            />
            <ToggleRow
              title="Ride Notifications"
              description="Receive ride-related updates."
              value={settings.rideNotifications}
              onValueChange={(v) => setSetting('rideNotifications', v)}
            />
          </SectionCard>
        </View>

        <View style={styles.section}>
          <SectionLabel>Permissions</SectionLabel>
          <SectionCard>
            <PermissionRow
              icon="near-me"
              title="Location"
              description="Allow location access for ride routes and emergency locations."
              onManage={openSystemSettings}
            />
            <PermissionRow
              icon="notifications"
              title="Notification Permission"
              description="Manage SafeRide notification access."
              onManage={openSystemSettings}
            />
          </SectionCard>
        </View>

        <SectionCard padded={false}>
          <LinkRow
            title="Edit Profile"
            description="Update rider name, email, and phone number"
            onPress={() => navigation?.navigate('EditProfile')}
          />
        </SectionCard>

        <SectionCard>
          <AboutCard />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  backBtn: {
    width: 48, height: 48, alignItems: 'center', justifyContent: 'center',
    marginLeft: spacing.xs, marginTop: 4,
  },
  content: { paddingHorizontal: spacing.md, paddingBottom: 48, gap: spacing.lg },
  intro: { paddingTop: spacing.xs, gap: 4 },
  heading: { fontFamily: fonts.manropeBold, fontSize: 28, lineHeight: 36, letterSpacing: -0.5, color: colors.primary },
  subtitle: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant },
  section: { gap: spacing.xs },
});