
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts } from '../constants/theme';
import HomeScreen from '../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();

// Placeholder for screens not included in this shared project
const createPlaceholder = (title) => {
  return function PlaceholderScreen() {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {title} - Coming Soon
        </Text>
      </View>
    );
  };
};

const RidePlaceholder = createPlaceholder('Ride');
const AlertsPlaceholder = createPlaceholder('Alerts');
const ProfilePlaceholder = createPlaceholder('Profile');

const TABS = [
  { name: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { name: 'Ride', label: 'Ride', icon: 'speed', component: RidePlaceholder },
  { name: 'Alerts', label: 'Alerts', icon: 'warning', component: AlertsPlaceholder },
  { name: 'Profile', label: 'Profile', icon: 'person', component: ProfilePlaceholder },
];

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
          backgroundColor: 'rgba(249,249,255,0.96)',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -1 },
        },
      }}
    >
      {TABS.map((t) => (
        <Tab.Screen
          key={t.name}
          name={t.name}
          component={t.component}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={[
                  styles.label,
                  {
                    color,
                    fontFamily: focused
                      ? fonts.manropeBold
                      : fonts.manropeSemi,
                  },
                ]}
              >
                {t.label}
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name={t.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: 2,
  },

  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  placeholderText: {
    fontFamily: fonts.manropeSemi,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
});
