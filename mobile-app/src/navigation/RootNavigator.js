import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainTabs from './MainTabs';

import EmergencyContactsScreen from '../screens/contacts/EmergencyContactsScreen';
import RideHistoryScreen from '../screens/ride/RideHistoryScreen';
import PreRideCheckScreen from '../screens/ride/PreRideCheckScreen';
import ActiveRideScreen from '../screens/ride/ActiveRideScreen';

import AccidentHistoryScreen from '../screens/incidents/AccidentHistoryScreen';
import AccidentWarningScreen from '../screens/incidents/AccidentWarningScreen';
import RiderConfirmedSafeScreen from '../screens/incidents/RiderConfirmedSafeScreen';
import EmergencyNotificationSentScreen from '../screens/incidents/EmergencyNotificationSentScreen';
import EmergencyContactAlertScreen from '../screens/incidents/EmergencyContactAlertScreen';

import SettingsScreen from '../screens/profile/SettingsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      {/* Auth flow */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main app (bottom tabs) */}
      <Stack.Screen name="Main" component={MainTabs} />

      {/* Ride flow: Home → PreRideCheck → ActiveRide → RideHistory */}
      <Stack.Screen name="PreRideCheck" component={PreRideCheckScreen} />
      <Stack.Screen name="ActiveRide" component={ActiveRideScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} />

      {/* Accident / emergency flow (swipe-back disabled so alerts can't be dismissed by accident) */}
      <Stack.Screen name="AccidentWarning" component={AccidentWarningScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RiderConfirmedSafe" component={RiderConfirmedSafeScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="EmergencyNotificationSent" component={EmergencyNotificationSentScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="EmergencyContactAlert" component={EmergencyContactAlertScreen} />

      {/* Screens that open on top of the tabs */}
      <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
      <Stack.Screen name="AccidentHistory" component={AccidentHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}