import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../../constants/theme';
import { PRIORITY } from '../../constants/priorities';

export default function PriorityTag({ priority }) {
  const isPrimary = priority === PRIORITY.PRIMARY;
  return (
    <View style={[styles.tag, { backgroundColor: isPrimary ? colors.secondaryContainer : colors.surfaceContainerHigh }]}>
      <Text style={[styles.text, { color: isPrimary ? colors.onSecondaryContainer : colors.onPrimaryFixedVariant }]}>
        {priority}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  text: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5 },
});