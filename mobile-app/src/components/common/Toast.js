import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Pressable, StyleSheet, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function Toast({
  visible,
  message,
  onHide,
  duration = 3200,
  icon = 'check-circle',
  backgroundColor = theme.colors.secondary,
  textColor = theme.colors.onSecondary,
}) {
  const translateY = useRef(new Animated.Value(-12)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : -12,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    if (visible && duration > 0) {
      const t = setTimeout(() => onHide?.(), duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration, onHide, translateY, opacity]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[styles.wrap, { backgroundColor, opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.left}>
        <MaterialIcons name={icon} size={20} color={textColor} />
        <Text style={[styles.text, { color: textColor }]} numberOfLines={2}>
          {message}
        </Text>
      </View>
      <Pressable onPress={onHide} hitSlop={10}>
        <MaterialIcons name="close" size={18} color={textColor} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 72,
    left: '5%',
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 50,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  text: { ...theme.typography.labelLg, flexShrink: 1 },
});