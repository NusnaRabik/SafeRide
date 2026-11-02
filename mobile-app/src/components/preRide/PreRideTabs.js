import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';

export default function PreRideTabs({ activeTab, onSelectTab }) {
  const isReady = activeTab === 'ready';
  const isIssues = activeTab === 'issues';

  return (
    <View style={styles.container}>
      {/* Ready to Ride Tab */}
      <TouchableOpacity
        style={[styles.tab, isReady && styles.tabActive]}
        onPress={() => onSelectTab('ready')}
        activeOpacity={0.8}
        accessibilityRole="tab"
        accessibilityState={{ selected: isReady }}
      >
        <MaterialIcons
          name="check-circle"
          size={18}
          color={isReady ? colors.secondary : colors.outline}
          style={styles.icon}
        />
        <Text style={[styles.tabText, isReady && styles.tabTextActive]}>
          Ready to Ride
        </Text>
      </TouchableOpacity>

      {/* Check Issues Tab */}
      <TouchableOpacity
        style={[styles.tab, isIssues && styles.tabActive]}
        onPress={() => onSelectTab('issues')}
        activeOpacity={0.8}
        accessibilityRole="tab"
        accessibilityState={{ selected: isIssues }}
      >
        <MaterialIcons
          name="warning"
          size={18}
          color={isIssues ? colors.danger : colors.outline}
          style={styles.icon}
        />
        <Text style={[styles.tabText, isIssues && styles.tabTextActive]}>
          Check Issues
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eef2f6',
    borderRadius: radius.xl,
    padding: 4,
    marginVertical: spacing.sm,
    gap: 6,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 6,
  },
  tabText: {
    fontFamily: fonts.manropeSemi,
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  tabTextActive: {
    fontFamily: fonts.manropeBold,
    color: colors.onSurface,
  },
});

