import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '../../constants/theme';
import useIncidents from '../../hooks/useIncidents';

import ScreenHeader from '../../components/common/ScreenHeader';
import EmptyState from '../../components/common/EmptyState';
import IncidentCard from '../../components/incidents/IncidentCard';

export default function AccidentHistoryScreen({ navigation }) {
  const { incidents } = useIncidents();

  const openIncident = (incident) => {
    // TODO: navigation.navigate('IncidentDetail', { incidentId: incident.id }) once that screen exists
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Accident History" centered onBack={() => navigation?.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ gap: 4 }}>
          <Text style={styles.heading}>Your Accident History</Text>
          <Text style={styles.subtitle}>View your previously recorded accident alerts.</Text>
        </View>

        {incidents.length > 0 ? (
          <View style={styles.list}>
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} onPress={() => openIncident(incident)} />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="shield"
            title="No Accident History"
            text="Your recorded accident alerts will appear here."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.lg, paddingBottom: 48, gap: spacing.lg },
  heading: { fontFamily: fonts.manropeBold, fontSize: 22, letterSpacing: -0.3, color: colors.primaryContainer },
  subtitle: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant },
  list: { gap: spacing.sm },
});