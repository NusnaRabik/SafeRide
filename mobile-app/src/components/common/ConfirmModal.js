import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function ConfirmModal({
  visible,
  icon = 'help-outline',
  iconColor,
  iconBg,
  title,
  message,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  confirmStyle = 'danger',
  onCancel,
  onConfirm,
  busy = false,
}) {
  const danger = confirmStyle === 'danger';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg ?? theme.colors.errorContainer }]}>
            <MaterialIcons name={icon} size={24} color={iconColor ?? theme.colors.error} />
          </View>

          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}

          <View style={styles.row}>
            <Pressable
              style={({ pressed }) => [styles.btn, styles.cancelBtn, pressed && styles.pressed]}
              onPress={onCancel}
              disabled={busy}
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.btn,
                danger ? styles.confirmDanger : styles.confirmNeutral,
                pressed && styles.pressed,
                busy && styles.disabled,
              ]}
              onPress={onConfirm}
              disabled={busy}
            >
              <Text style={[styles.confirmText, danger && { color: theme.colors.onError }]}>
                {busy ? 'Please wait…' : confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 37, 65, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...theme.typography.headlineSm, color: theme.colors.onSurface },
  message: {
    ...theme.typography.bodySm,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  row: { flexDirection: 'row', gap: 8, width: '100%', marginTop: 8 },
  btn: { flex: 1, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { backgroundColor: theme.colors.surfaceContainerHigh },
  cancelText: { ...theme.typography.labelLg, color: theme.colors.onSurface },
  confirmDanger: { backgroundColor: theme.colors.error },
  confirmNeutral: { backgroundColor: theme.colors.primary },
  confirmText: { ...theme.typography.labelLg, color: theme.colors.onPrimary },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.6 },
});