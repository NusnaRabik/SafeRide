import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../constants/theme';

export default function WarningFootnote() {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="contact-emergency"
        size={18}
        color={colors.danger}
        style={styles.icon}
      />
      <Text style={styles.footnoteText}>
        If you don't respond before the countdown ends, SafeRide will automatically
        send an emergency alert to your saved emergency contacts when the service
        is available.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(220, 38, 38, 0.05)',
    borderRadius: 8,
    padding: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    width: '100%',
  },
  icon: {
    marginRight: 8,
    marginTop: 1,
  },
  footnoteText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
});