import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

import WarningAlertBanner from '../../components/warning/WarningAlertBanner';
import WarningHeadline from '../../components/warning/WarningHeadline';
import CountdownHero from '../../components/warning/CountdownHero';

export default function AccidentWarningScreen({ navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(30);

  // Active reverse countdown loop (30s down to 0)
  useEffect(() => {
    if (secondsLeft <= 0) {
      // Auto-escalate if timer hits 0
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Part 1: Alert Banner */}
        <WarningAlertBanner />

        {/* Part 2: Headline */}
        <WarningHeadline />

        {/* Part 3: Circular Countdown Hero */}
        <CountdownHero seconds={secondsLeft} />

        {/* Parts 4–5 (Action buttons, advisory footnote) will be added here */}
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