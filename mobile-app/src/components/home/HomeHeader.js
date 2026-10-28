import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, shadow } from '../../constants/theme';
import { APP_NAME } from '../../constants/app';
import AppIcon from '../auth/AppIcon';
import StatusPill from '../common/StatusPill';

export default function HomeHeader({ online = true, onProfilePress }) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <AppIcon size={32} shadowed={false} />
        <View>
          <Text style={styles.title}>{APP_NAME}</Text>
          <Text style={styles.sub}>Home</Text>
        </View>
      </View>

      <View style={styles.right}>
        {/* TODO: drive `online` from the network / server connection (e.g. @react-native-community/netinfo) */}
        <StatusPill label={online ? 'Connected' : 'Offline'} tone={online ? 'success' : 'neutral'} pulse={online} />
        <TouchableOpacity style={styles.avatar} onPress={onProfilePress} accessibilityLabel="Profile">
          <MaterialIcons name="person" size={18} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    backgroundColor: colors.background,
    ...shadow,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  title: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: -0.2, lineHeight: 24, color: colors.primary },
  sub: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, lineHeight: 14, color: colors.onSurfaceVariant },
  right: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  avatar: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
});