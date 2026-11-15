import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing } from '../../constants/theme';

export default function PermissionRow({ icon, title, description, onManage }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <MaterialIcons name={icon} size={20} color={colors.primaryContainer} />
        </View>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onManage} activeOpacity={0.8}>
        <Text style={styles.btnText}>Manage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, minHeight: 48 },
  left: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, flex: 1 },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20, marginTop: 2,
    backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center',
  },
  text: { flex: 1, paddingRight: spacing.xs },
  title: { fontFamily: fonts.manropeBold, fontSize: 14, letterSpacing: 0.7, color: colors.primary },
  desc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant },
  btn: {
    height: 44, paddingHorizontal: spacing.md, borderRadius: 22,
    backgroundColor: colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center',
  },
  btnText: { fontFamily: fonts.manropeSemi, fontSize: 12, letterSpacing: 0.5, color: colors.primary },
});