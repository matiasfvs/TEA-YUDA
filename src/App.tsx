// AppScreen.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {TabNavigator} from './navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppScreen() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}