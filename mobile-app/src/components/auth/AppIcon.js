import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, shadow } from '../../constants/theme';

// THE SafeRide logo. Every screen (Welcome, Login, Register, Home header) uses this one component,
// so changing it here changes the logo everywhere.
//
// To use the real logo image:
// 1. Put it at  mobile-app/assets/logo.png
// 2. Add:     import { Image } from 'react-native';
//             const LOGO = require('../../../assets/logo.png');
// 3. Replace the <MaterialIcons .../> below with:
//             <Image source={LOGO} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
//
// size: width/height in pixels | shadowed: soft drop shadow
export default function AppIcon({ size = 64, shadowed = true }) {
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, borderRadius: Math.round(size * 0.25) },
        shadowed && shadow,
      ]}
    >
      <MaterialIcons name="two-wheeler" size={Math.round(size * 0.55)} color={colors.primaryContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});