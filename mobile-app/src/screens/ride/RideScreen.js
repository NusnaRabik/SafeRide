import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import ScreenHeader from '../../components/common/ScreenHeader';
import EmptyState from '../../components/common/EmptyState';

// Placeholder for the Ride tab. Replace with the real ride dashboard when its design is ready.
export default function RideScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Ride" centered largeTitle />
      <View style={styles.body}>
        <EmptyState
          icon="speed"
          title="Ride dashboard coming soon"
          text="Start and monitor your ride here."
          actionLabel="View Ride History"
          onAction={() => navigation?.navigate('RideHistory')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, justifyContent: 'center' },
});