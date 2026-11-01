import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ActiveRideStatusChips({
  helmetConnected = true,
  monitoringActive = true,
}) {
  return (
    <View style={styles.container}>
      {/* Helmet Status Chip */}
      <View
        style={[
          styles.chip,
          !helmetConnected && styles.chipDisconnected,
        ]}
      >
        <MaterialIcons
          name="sports-motorsports"
          size={16}
          color={helmetConnected ? colors.success : colors.danger}
          style={styles.icon}
        />
        <Text
          style={[
            styles.text,
            !helmetConnected && styles.textDisconnected,
          ]}
          numberOfLines={1}
        >
          {helmetConnected ? 'Helmet Connected' : 'Helmet Offline'}
        </Text>
      </View>

      {/* Accident Monitoring Chip */}
      <View style={styles.chip}>
        <MaterialIcons
          name="shield"
          size={16}
          color={colors.success}
          style={styles.icon}
        />
        <Text style={styles.text} numberOfLines={1}>
          Accident Monitoring Active
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: spacing.xs,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf8f0',
    borderWidth: 1,
    borderColor: '#c6edd4',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: radius.xl,
  },
  chipDisconnected: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: fonts.manropeBold,
    fontSize: 11,
    color: '#0d5c38',
  },
  textDisconnected: {
    color: colors.danger,
  },
});

