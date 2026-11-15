import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

// Pulsing "ping" circle. solid=false renders only the expanding aura.
export default function PulseDot({ color, size = 12, maxScale = 2.2, startOpacity = 0.7, solid = true, style }) {
  const a = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(Animated.timing(a, { toValue: 1, duration: 1100, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [a]);

  const scale = a.interpolate({ inputRange: [0, 1], outputRange: [1, maxScale] });
  const opacity = a.interpolate({ inputRange: [0, 1], outputRange: [startOpacity, 0] });
  const round = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[round, style]} pointerEvents="none">
      <Animated.View
        style={[StyleSheet.absoluteFill, round, { backgroundColor: color, opacity, transform: [{ scale }] }]}
      />
      {solid && <View style={[round, { backgroundColor: color }]} />}
    </View>
  );
}