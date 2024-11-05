import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ButtonAction from '../components/buttonAction';
import SaveImage from '../components/saveImage';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const buttonActionRef = useRef<any>(null);

  const handleNewImageSaved = () => {
    if (buttonActionRef.current) {
      buttonActionRef.current.loadPhotos();
    }
  };

  return (     <View style={styles.container}>
    <NavigationContainer>
 
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: 'home' | 'person' | 'save' = 'home';

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Guardar') {
                iconName = 'save';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#2ab49', // Fondo verde en la cabecera
            },
            headerTintColor: '#fff', // Color del texto en la cabecera
          })}
        >
          <Tab.Screen name="Galeria" component={() => <ButtonAction ref={buttonActionRef} />} />
          <Tab.Screen name="Guardar" component={() => <SaveImage onNewImageSaved={handleNewImageSaved} />} />

        </Tab.Navigator>
  
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ab49', // Fondo verde oscuro
  },
});

export default HomeScreen;
