import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function MenuRow({ item, isLast, onPress }) {
  const danger = item.variant === 'danger';
  const iconColor = danger ? theme.colors.error : theme.colors.primary;
  const iconBg = danger ? 'rgba(255, 218, 214, 0.4)' : theme.colors.surfaceContainerLow;

  return (
    <>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: theme.colors.surfaceContainerLow }}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <MaterialIcons name={item.icon} size={24} color={iconColor} />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
        </View>

        <MaterialIcons name="chevron-right" size={20} color={theme.colors.outline} />
      </Pressable>

      {!isLast && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  pressed: { backgroundColor: theme.colors.surfaceContainerLow },
  iconBox: {
    width: 44, height: 44, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  textWrap: { flex: 1, minWidth: 0 },
  title: { ...theme.typography.labelLg, color: theme.colors.onSurface },
  subtitle: { ...theme.typography.bodySm, color: theme.colors.onSurfaceVariant, marginTop: 2 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.surfaceContainerHigh,
    marginHorizontal: 16,
  },
});