import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';
import useHelmet from '../../hooks/useHelmet';

import ActiveRideHeader from '../../components/activeRide/ActiveRideHeader';
import ActiveRideStatusChips from '../../components/activeRide/ActiveRideStatusChips';
import RideTimerHero from '../../components/activeRide/RideTimerHero';
import RideMetricsGrid from '../../components/activeRide/RideMetricsGrid';

export default function ActiveRideScreen({ navigation }) {
  const helmet = useHelmet();
  const [elapsedSeconds, setElapsedSeconds] = useState(48);

  // Live trip ticker loop
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

        {/* Part 3: Primary Ride HUD / Duration Timer */}
        <RideTimerHero seconds={elapsedSeconds} />

        {/* Part 4: 2-Column Glanceable Telemetry Grid */}
        <RideMetricsGrid seconds={elapsedSeconds} distanceKm={0.0} />

        {/* Further parts (safety card, controls) will be appended here */}
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
