import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import useHelmet from '../../hooks/useHelmet';
import useContacts from '../../hooks/useContacts';

import PreRideHeader from '../../components/preRide/PreRideHeader';
import PreRideTabs from '../../components/preRide/PreRideTabs';
import ReadinessBanner from '../../components/preRide/ReadinessBanner';
import SafetyChecklist from '../../components/preRide/SafetyChecklist';
import RideSafetyTipCard from '../../components/preRide/RideSafetyTipCard';
import StartRideButton from '../../components/preRide/StartRideButton';

export default function PreRideCheckScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('ready');
  const helmet = useHelmet();
  const { contacts } = useContacts();

  const handleBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleProfile = () => {
    navigation?.navigate('Profile');
  };

  const handleHelmet = () => {
    navigation?.navigate('HelmetPairing');
  };

  const handleContacts = () => {
    navigation?.navigate('EmergencyContacts');
  };

  const handleStartRide = () => {
    navigation?.navigate('ActiveRide');
  };

  const allPassed = helmet.connected && contacts.length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <PreRideHeader onBack={handleBack} onProfilePress={handleProfile} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Part 2: Segmented Filter Tabs */}
        <PreRideTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Part 3: Readiness Summary Banner */}
        <ReadinessBanner isReady={activeTab === 'ready' && allPassed} />

        {/* Part 4: Interactive Safety Checklist */}
        <SafetyChecklist
          helmetConnected={helmet.connected}
          internetConnected={true}
          contactsConfigured={contacts.length > 0}
          onHelmetPress={handleHelmet}
          onContactsPress={handleContacts}
        />

        {/* Part 5: Ride Safety Advisory Tip Card */}
        <RideSafetyTipCard />

        {/* Part 6: Dynamic Call-to-Action & Advisory Footnote */}
        <StartRideButton
          disabled={!allPassed}
          onPress={handleStartRide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
});
