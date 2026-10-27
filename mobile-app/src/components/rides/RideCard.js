import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import { formatRideDate, formatDuration, formatDistance, shortPlace } from '../../utils/format';

export default function RideCard({ ride, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View style={styles.top}>
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <MaterialIcons name="two-wheeler" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.date}>{formatRideDate(ride.startedAt)}</Text>
            <Text style={styles.meta}>
              {formatDuration(ride.durationMins)} • {formatDistance(ride.distanceKm)}
            </Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
      </View>

      <View style={styles.route}>
        <MaterialCommunityIcons name="routes" size={18} color={colors.primary} />
        <Text style={styles.routeText} numberOfLines={1}>
          {shortPlace(ride.start)} • {shortPlace(ride.end)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: spacing.md, gap: spacing.xs, ...shadow },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flex: 1 },
  iconBox: {
    width: 36, height: 36, borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center',
  },
  date: { fontFamily: fonts.manropeSemi, fontSize: 20, color: colors.primary },
  meta: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
  route: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(241,243,255,0.5)', borderRadius: radius.lg, padding: 8,
  },
  routeText: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
});