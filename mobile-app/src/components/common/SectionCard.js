import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../../constants/theme';

// White rounded card. Puts a thin divider between its children automatically.
export default function SectionCard({ children, padded = true, style }) {
  const items = React.Children.toArray(children);
  return (
    <View style={[styles.card, padded && styles.padded, style]}>
      {items.map((child, i) => (
        <React.Fragment key={child.key ?? i}>
          {i > 0 && <View style={styles.divider} />}
          {child}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, overflow: 'hidden', ...shadow },
  padded: { padding: spacing.md, gap: spacing.md },
  divider: { height: 1, backgroundColor: colors.surfaceContainerHigh, width: '100%' },
});