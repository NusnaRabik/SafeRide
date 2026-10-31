import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import PreRideHeader from '../../components/preRide/PreRideHeader';
import PreRideTabs from '../../components/preRide/PreRideTabs';

export default function PreRideCheckScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('ready');

  const handleBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleProfile = () => {
    navigation?.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <PreRideHeader onBack={handleBack} onProfilePress={handleProfile} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Part 2: Segmented Filter Tabs */}
        <PreRideTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Further parts (readiness banner, checklist, tip card, CTA) will be appended here */}
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
