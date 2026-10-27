import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../../constants/theme';
import { PRIORITY } from '../../constants/priorities';
import { DEFAULT_PHONE_PREFIX, callNumber, isValidPhone } from '../../utils/phone';
import useContacts from '../../hooks/useContacts';

import ScreenHeader from '../../components/common/ScreenHeader';
import InfoBanner from '../../components/common/InfoBanner';
import InfoNote from '../../components/common/InfoNote';
import AppButton from '../../components/common/AppButton';
import ContactCard from '../../components/contacts/ContactCard';
import ContactForm from '../../components/contacts/ContactForm';

const EMPTY_FORM = { name: '', phone: DEFAULT_PHONE_PREFIX, priority: PRIORITY.SECONDARY };

export default function EmergencyContactsScreen({ navigation }) {
  const { contacts, addContact, editContact, deleteContact } = useContacts();
  const [menuId, setMenuId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (c) => {
    setMenuId(null);
    setEditingId(c.id);
    setForm({ name: c.name, phone: c.phone, priority: c.priority });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async () => {
    const data = { name: form.name.trim(), phone: form.phone.trim(), priority: form.priority };
    if (!data.name || !isValidPhone(data.phone)) {
      Alert.alert('Missing details', 'Enter a name and a valid phone number.');
      return;
    }
    if (editingId) await editContact(editingId, data);
    else await addContact(data);
    closeForm();
  };

  const handleDelete = (id) => {
    setMenuId(null);
    Alert.alert('Delete contact', 'Remove this emergency contact?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteContact(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Emergency Contacts" onBack={() => navigation?.goBack()} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => setMenuId(null)}
        >
          <InfoBanner
            title="Emergency Contacts Network"
            text="Add trusted contacts who can be notified when SafeRide detects a possible accident or the rider sends an SOS."
          />

          {contacts.map((c, i) => (
            <ContactCard
              key={c.id}
              contact={c}
              order={i + 1}
              menuOpen={menuId === c.id}
              onToggleMenu={() => setMenuId(menuId === c.id ? null : c.id)}
              onCall={() => callNumber(c.phone)}
              onEdit={() => openEdit(c)}
              onDelete={() => handleDelete(c.id)}
            />
          ))}

          {formOpen ? (
            <ContactForm
              form={form}
              onChange={updateForm}
              isEditing={!!editingId}
              onCancel={closeForm}
              onSave={handleSave}
            />
          ) : (
            <AppButton label="Add Contact" icon="add" variant="hero" onPress={openAdd} style={{ marginTop: 4 }} />
          )}

          <InfoNote
            title="HOW EMERGENCY ALERTS WORK"
            text="When a possible accident is detected, SafeRide prompts the rider to confirm they are safe. If they do not respond, the app initiates an emergency alert to the configured contacts. Manual SOS sends an alert immediately."
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 48, gap: spacing.sm },
});