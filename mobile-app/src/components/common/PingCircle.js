import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { USE_NATIVE_DRIVER } from '../../constants/animation';

// A circle that grows and fades out in a loop (radar "ping" effect)
export default function PingCircle({ size, color, duration = 1800, style }) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(t, { toValue: 1, duration, easing: Easing.bezier(0, 0, 0.2, 1), useNativeDriver: USE_NATIVE_DRIVER })
    );
    loop.start();
    return () => loop.stop();
  }, [t, duration]);

  const scale = t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 2, 2] });
  const opacity = t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 0, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity, transform: [{ scale }] },
        style,
      ]}
    />
  );
}