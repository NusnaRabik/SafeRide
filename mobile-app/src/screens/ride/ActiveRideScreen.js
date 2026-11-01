import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import useHelmet from '../../hooks/useHelmet';

import ActiveRideHeader from '../../components/activeRide/ActiveRideHeader';
import ActiveRideStatusChips from '../../components/activeRide/ActiveRideStatusChips';

export default function ActiveRideScreen({ navigation }) {
  const helmet = useHelmet();

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
      <ActiveRideHeader onBack={handleBack} onProfilePress={handleProfile} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Part 2: Dual Status Chips */}
        <ActiveRideStatusChips
          helmetConnected={helmet.connected}
          monitoringActive={true}
        />

        {/* Further parts (live timer hero, telemetry grid, safety card, controls) will be appended here */}
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
