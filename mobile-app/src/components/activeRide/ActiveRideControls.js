import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ActiveRideControls({ onEndRide, onSosPress }) {
  const handleEndRideConfirm = () => {
    Alert.alert(
      'End Ride?',
      'Are you sure you want to finish and save this ride session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Ride',
          style: 'destructive',
          onPress: onEndRide,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. End Ride Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.endRideButton}
          onPress={handleEndRideConfirm}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="End ride"
        >
          <MaterialIcons
            name="stop-circle"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.endRideText}>End Ride</Text>
        </TouchableOpacity>
        <Text style={styles.buttonCaption}>Tap to confirm ending ride</Text>
      </View>

      {/* 2. Red Emergency SOS Button (Hold to Confirm) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={onSosPress}
          onLongPress={onSosPress}
          delayLongPress={2000}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Emergency SOS"
        >
          <MaterialIcons
            name="place"
            size={20}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={styles.sosText}>SOS — Press & Hold</Text>
        </TouchableOpacity>
        <Text style={styles.buttonCaption}>
          Hold for 3 seconds to alert your emergency contacts.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  endRideButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  endRideText: {
    fontFamily: fonts.manropeBold,
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  sosButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
    paddingVertical: 15,
    borderRadius: radius.xl,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sosText: {
    fontFamily: fonts.manropeBold,
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonCaption: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 6,
  },
});