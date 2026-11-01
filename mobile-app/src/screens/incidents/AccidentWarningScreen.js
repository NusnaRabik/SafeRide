import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

import WarningAlertBanner from '../../components/warning/WarningAlertBanner';
import WarningHeadline from '../../components/warning/WarningHeadline';
import CountdownHero from '../../components/warning/CountdownHero';
import WarningActionButtons from '../../components/warning/WarningActionButtons';

export default function AccidentWarningScreen({ navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(30);

  
  useEffect(() => {
    if (secondsLeft <= 0) {
      
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

    const handleSafe = () => {
        navigation?.navigate('RiderConfirmedSafe');
    };  

    const handleImmediateSos = () => {
        navigation?.navigate('EmergencyNotificationSent');
    };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        
        <WarningAlertBanner />

        
        <WarningHeadline />

        
        <CountdownHero seconds={secondsLeft} />
       
        <WarningActionButtons
            onSafePress={handleSafe}
            onSosPress={handleImmediateSos} 
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
});