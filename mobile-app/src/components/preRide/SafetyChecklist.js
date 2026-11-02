import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function SafetyChecklist({
  helmetConnected = true,
  internetConnected = true,
  contactsConfigured = true,
  onHelmetPress,
  onContactsPress,
}) {
  const items = [
    {
      id: 'helmet',
      title: 'Helmet Connected',
      subtitle: 'SafeRide helmet connected to your phone',
      icon: 'sports-motorsports',
      iconColor: colors.primary,
      iconBg: '#e8edff',
      passed: helmetConnected,
      onPress: onHelmetPress,
    },
    {
      id: 'internet',
      title: 'Internet Connection',
      subtitle: 'Needed to send emergency alerts',
      icon: 'wifi',
      iconColor: colors.primary,
      iconBg: '#e8edff',
      passed: internetConnected,
    },
    {
      id: 'contacts',
      title: 'Emergency Contact Added',
      subtitle: 'Your selected emergency contacts verified',
      icon: 'contact-phone',
      iconColor: colors.primary,
      iconBg: '#e8edff',
      passed: contactsConfigured,
      onPress: onContactsPress,
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={item.onPress}
          activeOpacity={item.onPress ? 0.7 : 1}
          disabled={!item.onPress}
        >
          {/* Left Feature Icon */}
          <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
            <MaterialIcons name={item.icon} size={22} color={item.iconColor} />
          </View>

          {/* Title & Description */}
          <View style={styles.textWrap}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>

          {/* Right Status Indicator */}
          <View style={styles.statusWrap}>
            {item.passed ? (
              <View style={styles.checkCircle}>
                <MaterialIcons name="check" size={16} color="#ffffff" />
              </View>
            ) : (
              <View style={styles.issueCircle}>
                <MaterialIcons name="priority-high" size={14} color="#ffffff" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#e8edff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.manropeBold,
    fontSize: 14,
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  statusWrap: {
    marginLeft: spacing.sm,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  issueCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

