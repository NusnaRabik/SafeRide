import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import PriorityTag from './PriorityTag';

export default function ContactCard({ contact, order, menuOpen, onToggleMenu, onCall, onEdit, onDelete }) {
  return (
    <View style={[styles.card, menuOpen && { zIndex: 10 }]}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={26} color={colors.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{contact.name}</Text>
            <PriorityTag priority={contact.priority} />
          </View>
          <Text style={styles.phone}>{contact.phone}</Text>
        </View>

        <TouchableOpacity style={styles.callBtn} onPress={onCall} accessibilityLabel={`Call ${contact.name}`}>
          <MaterialIcons name="call" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreBtn} onPress={onToggleMenu} accessibilityLabel="More options">
          <MaterialIcons name="more-vert" size={20} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.savedRow}>
          <MaterialIcons name="check-circle-outline" size={16} color={colors.secondary} />
          <Text style={styles.footerText}>Saved contact</Text>
        </View>
        <Text style={styles.footerText}>Alert Order #{order}</Text>
      </View>

      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
            <MaterialIcons name="edit" size={18} color={colors.onSurface} />
            <Text style={styles.menuText}>Edit Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <MaterialIcons name="delete" size={18} color={colors.error} />
            <Text style={[styles.menuText, { color: colors.error }]}>Delete Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, padding: spacing.md, gap: spacing.sm, ...shadow },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 48, height: 48, borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontFamily: fonts.manropeSemi, fontSize: 20, color: colors.primary, flexShrink: 1 },
  phone: { fontFamily: fonts.bodyMedium, fontSize: 16, color: colors.onSurfaceVariant, letterSpacing: 0.4, marginTop: 2 },
  callBtn: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center',
  },
  moreBtn: { width: 32, height: 44, alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 },
  savedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontFamily: fonts.manropeSemi, fontSize: 12, color: colors.onSurfaceVariant, letterSpacing: 0.5 },
  menu: {
    position: 'absolute', right: 12, top: 60, width: 170,
    backgroundColor: colors.surfaceLowest, borderRadius: radius.xl, paddingVertical: 4,
    elevation: 6, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  menuText: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurface },
});