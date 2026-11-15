import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function ProfileHeaderCard({ user }) {
  if (!user) return null;

  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{user.initials}</Text>
        </View>

        {user.verified && (
          <View style={styles.badge}>
            <MaterialIcons
              name="verified"
              size={16}
              color={theme.colors.onSecondaryFixedVariant}
            />
          </View>
        )}
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.chip}>
        <Text style={styles.chipText}>{user.accountType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatarWrap: { marginBottom: 12 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...theme.typography.headlineLg,
    color: theme.colors.onPrimary,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...theme.typography.headlineSm,
    color: theme.colors.onSurface,
    marginTop: 4,
  },
  email: {
    ...theme.typography.bodySm,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  chip: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
  chipText: {
    ...theme.typography.labelSm,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
});