import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import { PRIORITY_OPTIONS } from '../../constants/priorities';
import FormInput from '../common/FormInput';
import AppButton from '../common/AppButton';

export default function ContactForm({ form, onChange, isEditing, onCancel, onSave }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.icon}>
            <MaterialIcons name="person-add" size={18} color={colors.onPrimaryFixed} />
          </View>
          <Text style={styles.title}>{isEditing ? 'Edit Emergency Contact' : 'New Emergency Contact'}</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onCancel} accessibilityLabel="Close">
          <MaterialIcons name="close" size={20} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <FormInput
        label="Full Name"
        icon="badge"
        placeholder="Enter full name"
        value={form.name}
        onChangeText={(t) => onChange({ name: t })}
      />
      <FormInput
        label="Phone Number"
        icon="call"
        placeholder="+94 7X XXX XXXX"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(t) => onChange({ phone: t })}
      />

      <Text style={styles.label}>Alert Priority</Text>
      <View style={styles.segment}>
        {PRIORITY_OPTIONS.map((opt) => {
          const active = form.priority === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.segmentItem, active && styles.segmentActive]}
              onPress={() => onChange({ priority: opt.key })}
            >
              <Text style={[styles.segmentText, active && { color: colors.onPrimary }]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.actions}>
        <AppButton label="Cancel" variant="tonal" onPress={onCancel} style={{ flex: 1 }} />
        <AppButton label="Save Contact" icon="check" variant="primary" onPress={onSave} style={{ flex: 2 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: spacing.lg,
    gap: 6, marginTop: 4, ...shadow, elevation: 4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  icon: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: fonts.manropeSemi, fontSize: 18, color: colors.primary, flexShrink: 1 },
  closeBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurfaceVariant, marginTop: 8, marginBottom: 4 },
  segment: { flexDirection: 'row', gap: 8 },
  segmentItem: {
    flex: 1, height: 48, borderRadius: radius.lg, backgroundColor: colors.surfaceContainer,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onPrimaryFixedVariant, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 16 },
});