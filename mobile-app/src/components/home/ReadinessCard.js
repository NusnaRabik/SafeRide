import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import ChecklistRow from './ChecklistRow';

// items: [{ key, icon, iconFamily, title, subtitle, done, onPress }]
export default function ReadinessCard({ items }) {
  const doneCount = items.filter((i) => i.done).length;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Ready to ride?</Text>
          <Text style={styles.desc}>Complete setup to get ready for your ride.</Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{doneCount}/{items.length}</Text>
        </View>
      </View>

      <View style={{ gap: 8, marginTop: 4 }}>
        {items.map(({ key, ...row }) => (
          <ChecklistRow key={key} {...row} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: 20, gap: spacing.sm, ...shadow },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: -0.2, color: colors.onSurface },
  desc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant },
  counter: {
    minWidth: 32, height: 32, paddingHorizontal: 6, borderRadius: 16,
    backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center',
  },
  counterText: { fontFamily: fonts.manropeBold, fontSize: 12, color: colors.onSurfaceVariant },
});