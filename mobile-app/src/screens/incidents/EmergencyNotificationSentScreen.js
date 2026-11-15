import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fonts } from '../../constants/theme';
import IncidentResultLayout from '../../components/incidents/IncidentResultLayout';

// TODO: replace with useContacts() once the contact shape is confirmed
const NOTIFIED = [
  { id: '1', name: 'Mom', role: 'Primary Contact' },
  { id: '2', name: 'Emergency Contact 2', role: 'Secondary' },
];

export default function EmergencyNotificationSentScreen({ navigation }) {
  return (
    <IncidentResultLayout
      tone="danger"
      bannerText="POSSIBLE ACCIDENT DETECTED"
      eyebrow="No response detected"
      title="Emergency Notification Sent"
      description="You didn't respond to the accident alert. An emergency notification has been sent to your saved contacts."
      ringIcon="notifications-none"
      ringLabel="NOTIFICATION SENT"
      onReturn={() => navigation.navigate('ActiveRide')}
    >
      <Text style={styles.note}>Returning does not cancel the notifications already sent.</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>EMERGENCY NOTIFICATIONS SENT TO</Text>
          <View style={styles.greenDot} />
        </View>

        {NOTIFIED.map((c, i) => (
          <View key={c.id} style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.index}>
                <Text style={styles.indexText}>{i + 1}</Text>
              </View>
              <Text style={styles.name} numberOfLines={1}>
                {c.name} <Text style={styles.role}>({c.role})</Text>
              </Text>
            </View>
            <View style={styles.sent}>
              <MaterialIcons name="check" size={12} color="#047857" />
              <Text style={styles.sentText}>Sent</Text>
            </View>
          </View>
        ))}

        <Text style={styles.cardNote}>Emergency contacts received incident telemetry and automated alert.</Text>
      </View>
    </IncidentResultLayout>
  );
}

const styles = StyleSheet.create({
  note: { fontFamily: fonts.bodyMedium, fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: -8 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(226,232,240,0.8)', padding: 16, gap: 12,
    shadowColor: '#123b5d', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 8,
  },
  cardTitle: { fontFamily: fonts.manropeExtra, fontSize: 12, letterSpacing: 0.5, color: '#123b5d', flexShrink: 1 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  index: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#f1f3ff', alignItems: 'center', justifyContent: 'center' },
  indexText: { fontFamily: fonts.manropeBold, fontSize: 10, color: '#123b5d' },
  name: { fontFamily: fonts.manropeBold, fontSize: 12, color: '#1e293b', flexShrink: 1 },
  role: { fontFamily: fonts.bodyMedium, fontSize: 11, color: '#64748b' },
  sent: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ecfdf5', borderWidth: 1,
    borderColor: 'rgba(134,239,172,0.8)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2,
  },
  sentText: { fontFamily: fonts.manropeBold, fontSize: 10, color: '#047857' },
  cardNote: {
    fontFamily: fonts.bodyMedium, fontSize: 11, color: '#64748b', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 8,
  },
});