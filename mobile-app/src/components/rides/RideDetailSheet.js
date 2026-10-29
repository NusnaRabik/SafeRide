import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { formatRideDate, formatDuration, formatDistance } from '../../utils/format';
import BottomSheet from '../common/BottomSheet';
import AppButton from '../common/AppButton';

export default function RideDetailSheet({ ride, onClose }) {
  return (
    <BottomSheet visible={!!ride} onClose={onClose}>
      {ride && (
        <>
          <View style={{ gap: 8 }}>
            <Text style={styles.date}>{formatRideDate(ride.startedAt)}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MaterialIcons name="timer" size={16} color={colors.onSurfaceVariant} />
                <Text style={styles.metaText}>{formatDuration(ride.durationMins)}</Text>
              </View>
              <Text style={styles.metaText}>•</Text>
              <View style={styles.metaItem}>
                <MaterialIcons name="straighten" size={16} color={colors.onSurfaceVariant} />
                <Text style={styles.metaText}>{formatDistance(ride.distanceKm)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.stop}>
              <MaterialIcons name="radio-button-checked" size={18} color={colors.primary} style={{ marginTop: 2 }} />
              <View>
                <Text style={styles.stopLabel}>Start</Text>
                <Text style={styles.stopValue}>{ride.start}</Text>
              </View>
            </View>
            <View style={styles.connector} />
            <View style={styles.stop}>
              <MaterialIcons name="location-on" size={18} color={colors.secondary} style={{ marginTop: 2 }} />
              <View>
                <Text style={styles.stopLabel}>End</Text>
                <Text style={styles.stopValue}>{ride.end}</Text>
              </View>
            </View>
          </View>

          <View style={styles.gpsBox}>
            <View style={styles.gpsHeader}>
              <MaterialIcons name="navigation" size={20} color={colors.primary} />
              <Text style={styles.gpsTitle}>GPS Route</Text>
            </View>

            {ride.hasGps ? (
              <View style={{ gap: 6 }}>
                {/* Replace this placeholder with a MapView later */}
                <View style={styles.mapPlaceholder}>
                  <MaterialIcons name="map" size={36} color="rgba(0,37,65,0.4)" />
                </View>
                <View style={styles.savedRow}>
                  <MaterialIcons name="check-circle-outline" size={16} color={colors.secondary} />
                  <Text style={styles.savedText}>Route recorded via device GPS</Text>
                </View>
              </View>
            ) : (
              <View style={styles.offlineRow}>
                <MaterialIcons name="gps-off" size={18} color={colors.outline} />
                <Text style={styles.offlineText}>
                  Route information is unavailable for this ride (GPS was offline).
                </Text>
              </View>
            )}
          </View>

          <AppButton label="Close" onPress={onClose} style={{ height: 44 }} />
        </>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  date: { fontFamily: fonts.manropeBold, fontSize: 20, color: colors.primary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
  box: { backgroundColor: colors.surfaceLow, borderRadius: radius.xl, padding: spacing.sm, gap: 8 },
  stop: { flexDirection: 'row', gap: 10 },
  stopLabel: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurfaceVariant },
  stopValue: { fontFamily: fonts.bodyMedium, fontSize: 16, color: colors.primary },
  connector: { width: 2, height: 16, backgroundColor: '#c2c7cf', marginLeft: 8 },
  gpsBox: { backgroundColor: 'rgba(241,243,255,0.6)', borderRadius: radius.xl, padding: spacing.md, gap: 8 },
  gpsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gpsTitle: { fontFamily: fonts.manropeBold, fontSize: 14, color: colors.primary },
  mapPlaceholder: {
    height: 96, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  savedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  savedText: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurfaceVariant },
  offlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  offlineText: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
});