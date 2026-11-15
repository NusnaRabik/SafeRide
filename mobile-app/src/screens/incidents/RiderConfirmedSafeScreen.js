import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fonts } from '../../constants/theme';
import IncidentResultLayout from '../../components/incidents/IncidentResultLayout';

export default function RiderConfirmedSafeScreen({ navigation }) {
  return (
    <IncidentResultLayout
      tone="safe"
      bannerText="SAFETY CONFIRMED"
      eyebrow="Safety confirmed by rider"
      title="Glad you’re OK!"
      description="You've confirmed that you're safe. The pending automatic emergency alert has been cancelled."
      ringIcon="check"
      ringLabel="YOU’RE SAFE"
      onReturn={() => navigation.navigate('ActiveRide')}
    >
      <View style={styles.card}>
        <MaterialIcons name="info-outline" size={20} color="#94a3b8" style={{ marginTop: 2 }} />
        <Text style={styles.cardText}>
          Your ride monitoring can continue. If you need emergency assistance later, you can use the SOS button.
        </Text>
      </View>
    </IncidentResultLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.8)', padding: 16,
    shadowColor: '#123b5d', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  cardText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 19, color: '#475569' },
});