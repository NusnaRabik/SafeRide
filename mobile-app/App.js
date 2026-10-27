import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { HankenGrotesk_400Regular, HankenGrotesk_500Medium } from '@expo-google-fonts/hanken-grotesk';

import EmergencyContactsScreen from './src/screens/contacts/EmergencyContactsScreen';
import RideHistoryScreen from './src/screens/ride/RideHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        {/* Temporary: initialRouteName is the screen you are testing. Change it to Login/Home later. */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RideHistory">
          <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
          <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}