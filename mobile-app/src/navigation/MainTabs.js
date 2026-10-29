import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts } from '../constants/theme';
import HomeScreen from '../screens/home/HomeScreen';
import RideHistoryScreen from '../screens/ride/RideHistoryScreen';
import AccidentHistoryScreen from '../screens/incidents/AccidentHistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// TODO: show the red dot only when there are unread alerts
const HAS_UNREAD_ALERTS = true;

const TABS = [
  { name: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { name: 'Ride', label: 'Ride', icon: 'speed', component: RideHistoryScreen },
  { name: 'Alerts', label: 'Alerts', icon: 'warning', component: AccidentHistoryScreen, badge: HAS_UNREAD_ALERTS },
  { name: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
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
              <Text style={[styles.label, { color, fontFamily: focused ? fonts.manropeBold : fonts.manropeSemi }]}>
                {t.label}
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <View>
                <MaterialIcons name={t.icon} size={24} color={color} />
                {t.badge && <View style={styles.dot} />}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, letterSpacing: 0.5, marginTop: 2 },
  dot: {
    position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.error, borderWidth: 2, borderColor: colors.background,
  },
});
