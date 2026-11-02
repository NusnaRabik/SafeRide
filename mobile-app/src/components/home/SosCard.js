import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../../constants/theme';
import AppButton from '../common/AppButton';

export default function SosCard({ onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.iconBox}>
          <MaterialIcons name="emergency" size={22} color={colors.onError} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Emergency SOS</Text>
          <Text style={styles.desc}>Need help? Alert your emergency contacts.</Text>
        </View>
      </View>

      <AppButton
        label="Emergency SOS"
        icon="sos"
        variant="danger"
        onPress={onPress}
        style={{ borderRadius: radius.xl, marginTop: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.errorContainer, borderRadius: radius.xl, padding: 20, gap: spacing.sm, ...shadow },
  top: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  iconBox: {
    width: 40, height: 40, borderRadius: radius.xl, backgroundColor: colors.error,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: fonts.manropeSemi, fontSize: 20, letterSpacing: -0.2, color: colors.tertiaryContainer },
  desc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.onSurfaceVariant, marginTop: 2 },
});