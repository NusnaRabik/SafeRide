import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function ReturnToRideButton({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Return to active ride"
      >
        <Text style={styles.buttonText}>RETURN TO ACTIVE RIDE</Text>
        <MaterialIcons
          name="replay"
          size={20}
          color="#ffffff"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: fonts.manropeBold,
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: 0.8,
  },
  icon: {
    marginLeft: 8,
  },
});