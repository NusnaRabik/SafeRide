import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import StatusPill from '../common/StatusPill';
import AppButton from '../common/AppButton';

export default function HelmetStatusCard({ connected, batteryPercent, onPress }) {
  const hasBattery = connected && batteryPercent != null;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.deviceLeft}>
          <View style={styles.deviceIcon}>
            <MaterialIcons name="sports-motorsports" size={26} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.deviceLabel}>DEVICE</Text>
            <Text style={styles.deviceName} numberOfLines={1}>Your SafeRide Helmet</Text>
          </View>
        </View>
        <StatusPill label={connected ? 'Connected' : 'Not connected'} tone={connected ? 'success' : 'neutral'} />
      </View>

      <View style={styles.batteryRow}>
        <View style={styles.batteryLeft}>
          <MaterialIcons
            name={hasBattery ? 'battery-full' : 'battery-unknown'}
            size={20}
            color={colors.onSurfaceVariant}
          />
          <Text style={styles.batteryLabel}>Battery status</Text>
        </View>
        <Text style={styles.batteryValue}>{hasBattery ? `${batteryPercent}%` : 'Connect helmet to check'}</Text>
      </View>

      <AppButton
        label={connected ? 'Manage Helmet' : 'Pair Helmet'}
        icon="bluetooth"
        variant="solid"
        onPress={onPress}
        style={{ borderRadius: radius.xl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: 20, gap: spacing.md, ...shadow },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xs },
  deviceLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  deviceIcon: {
    width: 48, height: 48, borderRadius: radius.xl, backgroundColor: colors.surfaceContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  deviceLabel: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 1, color: colors.onSurfaceVariant },
  deviceName: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: -0.2, color: colors.onSurface },
  batteryRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: radius.lg, backgroundColor: colors.surfaceLow,
  },
  batteryLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  batteryLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant },
  batteryValue: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.outline },
});