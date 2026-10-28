import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../../constants/theme';

// One row of the "Ready to ride?" list. iconFamily: 'material' | 'community'
export default function ChecklistRow({ icon, iconFamily = 'material', title, subtitle, done, onPress }) {
  const Icon = iconFamily === 'community' ? MaterialCommunityIcons : MaterialIcons;

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.sub}>{subtitle}</Text>
        </View>
      </View>

      <View style={[styles.badge, done ? styles.badgeDone : styles.badgeTodo]}>
        <Text style={[styles.badgeText, { color: done ? colors.onSecondaryContainer : colors.onSurfaceVariant }]}>
          {done ? 'Complete' : 'Incomplete'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    padding: 12, borderRadius: radius.lg, backgroundColor: colors.surfaceLow,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconBox: {
    width: 36, height: 36, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: fonts.bodyMedium, fontSize: 16, color: colors.onSurface },
  sub: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.outline },
  badge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 999 },
  badgeTodo: { backgroundColor: colors.surfaceContainerHigh },
  badgeDone: { backgroundColor: colors.secondaryContainer },
  badgeText: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5 },
});