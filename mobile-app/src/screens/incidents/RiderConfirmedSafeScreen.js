import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

import SafeRideOSHeader from '../../components/confirmedSafe/SafeRideOSHeader';
import SafetyConfirmedBanner from '../../components/confirmedSafe/SafetyConfirmedBanner';
import ConfirmedSafeCircle from '../../components/confirmedSafe/ConfirmedSafeCircle';
import ReturnToRideButton from '../../components/confirmedSafe/ReturnToRideButton';
import ConfirmedSafeFooter from '../../components/confirmedSafe/ConfirmedSafeFooter';

export default function RiderConfirmedSafeScreen({ navigation }) {
  const handleReturn = () => {
    navigation?.navigate('ActiveRide');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      
      <SafeRideOSHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SafetyConfirmedBanner />

        <ConfirmedSafeCircle />

        <ReturnToRideButton onPress={handleReturn} />

        <ConfirmedSafeFooter helmetId="#9042" />
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
});