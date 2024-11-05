import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');  // Obtener el tamaño de la pantalla

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/tea-yuda-logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Para que ocupe toda la pantalla
    justifyContent: 'center',  // Centrar contenido verticalmente
    alignItems: 'center',  // Centrar contenido horizontalmente
    backgroundColor: '#b6d9cc',
  },
  logo: {
    width: width * 0.8,   // 80% del ancho de la pantalla
    height: height * 0.4,  // 40% del alto de la pantalla
  },
});
