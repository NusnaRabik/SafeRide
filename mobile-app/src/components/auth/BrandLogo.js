import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../../constants/theme';
import AppIcon from './AppIcon';

// Welcome screen hero: the SafeRide icon inside a white frame with a soft green glow.
export default function BrandLogo() {
  return (
    <View style={styles.frame}>
      <AppIcon size={88} shadowed={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 112,
    height: 112,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondaryContainer,
    shadowOpacity: 0.9,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});