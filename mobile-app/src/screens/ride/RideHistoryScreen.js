import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, spacing, radius } from '../../constants/theme';
import { RIDE_FILTER } from '../../constants/rideFilters';
import { formatDistance, formatRideCount } from '../../utils/format';
import useRides from '../../hooks/useRides';

import ScreenHeader from '../../components/common/ScreenHeader';
import StatCard from '../../components/common/StatCard';
import EmptyState from '../../components/common/EmptyState';
import RideCard from '../../components/rides/RideCard';
import RideFilterMenu from '../../components/rides/RideFilterMenu';
import RideDetailSheet from '../../components/rides/RideDetailSheet';

export default function RideHistoryScreen({ navigation }) {
  const [filter, setFilter] = useState(RIDE_FILTER.ALL);
  const [selectedRide, setSelectedRide] = useState(null);
  const { rides, totalDistanceKm } = useRides(filter);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Ride History" centered onBack={() => navigation?.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title + filter */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Your Ride History</Text>
            <Text style={styles.subtitle}>View your previously completed rides and telemetry.</Text>
          </View>
          <RideFilterMenu value={filter} onChange={setFilter} />
        </View>

        {/* Totals */}
        <View style={styles.statsRow}>
          <StatCard label="Total Distance" value={formatDistance(totalDistanceKm)} />
          <StatCard label="Total Rides" value={formatRideCount(rides.length)} />
        </View>

        {/* Active filter chip */}
        {filter !== RIDE_FILTER.ALL && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{filter}</Text>
            <TouchableOpacity onPress={() => setFilter(RIDE_FILTER.ALL)} accessibilityLabel="Clear filter">
              <MaterialIcons name="close" size={14} color={colors.onPrimaryFixedVariant} />
            </TouchableOpacity>
          </View>
        )}

        {/* List / empty state */}
        {rides.length > 0 ? (
          rides.map((ride) => <RideCard key={ride.id} ride={ride} onPress={() => setSelectedRide(ride)} />)
        ) : (
          <EmptyState
            icon="sports-motorsports"
            title="No rides yet"
            text="Your completed rides will appear here."
            actionLabel="Back to Home"
            onAction={() => navigation?.goBack()}
          />
        )}
      </ScrollView>

      <RideDetailSheet ride={selectedRide} onClose={() => setSelectedRide(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 32, gap: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginTop: 4 },
  heading: { fontFamily: fonts.manropeBold, fontSize: 22, letterSpacing: -0.3, color: colors.primary },
  subtitle: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: spacing.xs },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  chipText: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onPrimaryFixedVariant },
});