import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import ActivitiesScreen from './ActivitiesScreen';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export  function TabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => (
        <Ionicons
          name={route.name === 'Home' ? 'home-outline' : 'list-outline'}
          size={size}
          color={color}
        />
      ),
      tabBarActiveTintColor: '#2f95dc',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
    >
      <Tab.Screen name="Home" 
      component={HomeScreen} 
      options={{title:'Inicio'}}
      />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
    </Tab.Navigator>
  );
}