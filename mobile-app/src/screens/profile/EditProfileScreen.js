import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { EDIT_PROFILE_FIELDS, RIDER_ID } from '../../constants/profile';
import { useProfile } from '../../hooks/useProfile';
import FormField from '../../components/profile/FormField';
import PhoneInput from '../../components/profile/PhoneInput';
import Toast from '../../components/common/Toast';

export default function EditProfileScreen({ navigation }) {
  const { user, loading, saveProfile, saving } = useProfile();

  const [values, setValues] = useState({ fullName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        fullName: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      });
    }
  }, [user]);

  const setField = useCallback((key, val) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const validateAll = useCallback(() => {
    const next = {};
    Object.entries(EDIT_PROFILE_FIELDS).forEach(([key, cfg]) => {
      const val = (values[key] ?? '').trim();
      if (cfg.required && !val) {
        next[key] = 'This field is required';
        return;
      }
      if (cfg.validate && val && !cfg.validate(val)) {
        next[key] = cfg.errorMessage ?? 'Invalid value';
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSave = useCallback(async () => {
    if (!validateAll()) return;
    const ok = await saveProfile({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    });
    if (ok) setToastVisible(true);
  }, [validateAll, saveProfile, values]);

  const handleAvatarPress = useCallback(() => {
    // TODO: expo-image-picker -> pick -> upload -> refresh user.
    setToastVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  const isValid = (key) => {
    const cfg = EDIT_PROFILE_FIELDS[key];
    const val = (values[key] ?? '').trim();
    if (!val) return false;
    if (cfg.validate) return cfg.validate(val);
    return true;
  };

  const initials = (values.fullName || 'N R')
    .split(' ')
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={handleCancel}
          hitSlop={12}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          accessibilityLabel="Back"
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Toast
        visible={toastVisible}
        message="Profile updated successfully"
        onHide={() => setToastVisible(false)}
        icon="check-circle"
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.avatarBlock}>
              <Pressable
                onPress={handleAvatarPress}
                style={({ pressed }) => [styles.avatarWrap, pressed && styles.pressed]}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarInitials}>{initials}</Text>
                </View>
                <View style={styles.avatarEditBtn}>
                  <MaterialIcons name="photo-camera" size={18} color={theme.colors.primary} />
                </View>
              </Pressable>
              <Text style={styles.avatarHint}>Tap to change photo (Optional)</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Personal Information</Text>
                <View style={styles.riderIdPill}>
                  <Text style={styles.riderIdText}>Rider ID #{RIDER_ID}</Text>
                </View>
              </View>

              <FormField
                label={EDIT_PROFILE_FIELDS.fullName.label}
                icon={EDIT_PROFILE_FIELDS.fullName.icon}
                placeholder={EDIT_PROFILE_FIELDS.fullName.placeholder}
                value={values.fullName}
                onChangeText={(t) => setField('fullName', t)}
                valid={isValid('fullName')}
                error={errors.fullName}
                autoCapitalize="words"
                autoComplete="name"
              />

              <FormField
                label={EDIT_PROFILE_FIELDS.email.label}
                icon={EDIT_PROFILE_FIELDS.email.icon}
                placeholder={EDIT_PROFILE_FIELDS.email.placeholder}
                value={values.email}
                onChangeText={(t) => setField('email', t)}
                valid={isValid('email')}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <PhoneInput
                label={EDIT_PROFILE_FIELDS.phone.label}
                placeholder={EDIT_PROFILE_FIELDS.phone.placeholder}
                value={values.phone}
                onChangeText={(t) => setField('phone', t)}
                valid={isValid('phone')}
                error={errors.phone}
              />
            </View>

            <View style={styles.syncCard}>
              <View style={styles.syncIcon}>
                <MaterialIcons name="shield" size={20} color={theme.colors.secondary} />
              </View>
              <Text style={styles.syncText}>
                Your updated contact details will be automatically synced with your
                linked emergency contacts and SafeRide crash alert system.
              </Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={handleSave}
                disabled={saving}
                style={({ pressed }) => [
                  styles.saveBtn,
                  pressed && styles.saveBtnPressed,
                  saving && styles.disabled,
                ]}
              >
                {saving ? (
                  <ActivityIndicator color={theme.colors.onPrimary} />
                ) : (
                  <>
                    <MaterialIcons name="save" size={20} color={theme.colors.onPrimary} />
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                  </>
                )}
              </Pressable>

              <Pressable
                onPress={handleCancel}
                style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  header: {
    height: 64,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.outlineVariant,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...theme.typography.headlineSm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  headerSpacer: { width: 44 },
  scroll: { padding: 16, gap: 16, paddingBottom: 32 },
  center: { padding: 40, alignItems: 'center' },
  avatarBlock: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    ...theme.typography.displayMd,
    color: theme.colors.onPrimary,
    letterSpacing: -0.5,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatarHint: {
    ...theme.typography.bodySm,
    color: theme.colors.onSurfaceVariant,
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { ...theme.typography.headlineSm, color: theme.colors.primary },
  riderIdPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceContainerLow,
  },
  riderIdText: { ...theme.typography.labelSm, color: theme.colors.onSurfaceVariant },
  syncCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceContainerLow,
    alignItems: 'flex-start',
  },
  syncIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(134, 249, 188, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  syncText: {
    ...theme.typography.bodySm,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
    flexShrink: 1,
  },
  actions: { gap: 8, paddingTop: 8 },
  saveBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  saveBtnPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  saveBtnText: { ...theme.typography.headlineSm, color: theme.colors.onPrimary },
  cancelBtn: { height: 48, alignItems: 'center', justifyContent: 'center' },
  cancelText: { ...theme.typography.labelLg, color: theme.colors.outline },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.7 },
});