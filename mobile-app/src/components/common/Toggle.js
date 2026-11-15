import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

// Pill switch (56x32) matching the SafeRide design
export default function Toggle({ value, onValueChange, label }) {
  const x = useRef(new Animated.Value(value ? 24 : 0)).current;

  useEffect(() => {
    Animated.timing(x, { toValue: value ? 24 : 0, duration: 200, useNativeDriver: true }).start();
  }, [value, x]);

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      style={[styles.track, { backgroundColor: value ? colors.primary : colors.outlineVariant }]}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX: x }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 56, height: 32, borderRadius: 16, padding: 4, justifyContent: 'center' },
  thumb: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceLowest,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2,
  },
});