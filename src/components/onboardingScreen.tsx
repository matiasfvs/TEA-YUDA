import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Array de pasos de inducción
const onboardingSteps = [
  { id: '1', title: 'Bienvenido a Teayuda', description: 'Paso 1: Para crear un botón, ve a la sección "Crear Botón".' },
  { id: '2', title: 'Selecciona una Imagen', description: 'Paso 2: Selecciona una imagen o toma una foto.' },
  { id: '3', title: 'Guarda tu Botón', description: 'Paso 3: Introduce un nombre y guarda el botón.' },
];

const OnboardingScreen = ({ onFinish }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null); // Definir el tipo de FlatList

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true'); // Guardar estado en AsyncStorage
      onFinish(); // Llamar a la función onFinish pasada como prop
    } catch (error) {
      console.error("Error al completar el onboarding:", error);
    }
  };

  // Manejar el botón "Siguiente" o "Cerrar"
  const handleNext = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Verificar que flatListRef.current no sea null antes de llamar a scrollToIndex
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    } else {
      completeOnboarding(); // Cierra el onboarding cuando llega al final
    }
  };

  // Renderizar cada paso de la inducción
  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingSteps}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      {/* Botón "Siguiente" o "Cerrar" */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingSteps.length - 1 ? 'Cerrar' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a92c3',
    paddingVertical: 20,
  },
  slide: {
    width: width, // Ocupa todo el ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#d884f4',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
