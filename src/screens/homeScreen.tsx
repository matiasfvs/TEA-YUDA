import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../components/profileScreen'; // Pantalla adicional
import { Ionicons } from '@expo/vector-icons';
import ButtonAction from '../components/buttonAction'; // Importar el componente ButtonAction
import SaveImage from '../components/saveImage'; // Importar el componente SaveImage

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const buttonActionRef = useRef<any>(null); // Usamos useRef para acceder al método loadPhotos de ButtonAction

  // Función que se ejecuta cuando se guarda una nueva imagen
  const handleNewImageSaved = () => {
    if (buttonActionRef.current) {
      buttonActionRef.current.loadPhotos(); // Llamar a loadPhotos en ButtonAction para recargar las imágenes
    }
  };

  return (
    <NavigationContainer>
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      // Definimos el tipo específico que acepta Ionicons en lugar de un string genérico
      let iconName: 'home' | 'person' | 'save' = 'home'; // Valor por defecto

      if (route.name === 'Home') {
        iconName = 'home'; // Icono para la pestaña Home
      } else if (route.name === 'Profile') {
        iconName = 'person'; // Icono para la pestaña Profile
      } else if (route.name === 'Guardar') {
        iconName = 'save'; // Icono para la pestaña Guardar
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Home" component={() => <ButtonAction ref={buttonActionRef} />} />
  <Tab.Screen name="Guardar" component={() => <SaveImage onNewImageSaved={handleNewImageSaved} />} />
  <Tab.Screen name="ChatAI" component={ProfileScreen} />
</Tab.Navigator>

    </NavigationContainer>
  );
};

export default HomeScreen;
