import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/splashScreen';
import { useEffect, useState } from 'react';
import HomeScreen from './src/screens/homeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/components/onboardingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        // Solo para depuración: Limpiar [`AsyncStorage`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fmotoralmaisangre%2FDocuments%2FGitHub%2FTEA-YUDA%2Fnode_modules%2F%40react-native-async-storage%2Fasync-storage%2Fsrc%2FAsyncStorage.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A75%2C%22character%22%3A0%7D%5D "node_modules/@react-native-async-storage/async-storage/src/AsyncStorage.ts") al iniciar
        await AsyncStorage.clear();

        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        console.log("Valor de 'hasSeenOnboarding' al iniciar:", hasSeenOnboarding);

        if (hasSeenOnboarding === null) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Error al obtener 'hasSeenOnboarding':", error);
      }
    };

    checkIfFirstLaunch();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingFinish = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true'); // Guardar que el tutorial ha sido visto
      const verification = await AsyncStorage.getItem('hasSeenOnboarding'); // Leer inmediatamente después para verificar
      console.log("Valor guardado en 'hasSeenOnboarding':", verification); // Mostrar en consola el valor guardado

      setShowOnboarding(false); // Cambiar a la pantalla principal
    } catch (error) {
      console.error("Error al guardar 'hasSeenOnboarding':", error);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      {showOnboarding ? (
        <OnboardingScreen onFinish={handleOnboardingFinish} />
      ) : (
        <HomeScreen />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9bd3ae',
  },
});