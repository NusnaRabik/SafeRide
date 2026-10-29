import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, shadow } from '../../constants/theme';
import { INCIDENT_STATUS_UI } from '../../constants/incidentStatus';
import { formatIncidentDate } from '../../utils/format';

export default function IncidentCard({ incident, onPress }) {
  const ui = INCIDENT_STATUS_UI[incident.status];

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.iconBox, { backgroundColor: ui.background }]}>
          <MaterialIcons name={ui.icon} size={22} color={ui.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>{incident.riderName}</Text>
          <Text style={styles.date}>{formatIncidentDate(incident.occurredAt)}</Text>
          <Text style={[styles.status, { color: ui.color }]} numberOfLines={1}>{ui.label}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={20} color={colors.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceLowest,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    ...shadow,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.manropeBold, fontSize: 15, letterSpacing: -0.15, color: colors.primaryContainer },
  date: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 },
  status: { fontFamily: fonts.bodyMedium, fontSize: 13, marginTop: 2 },
});