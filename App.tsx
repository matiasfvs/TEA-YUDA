import { View, StyleSheet } from 'react-native';
import AppScreen from './src/App';

export default function App() {
  return (
    <View style={styles.container}>
      <AppScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Esto hace que el contenedor ocupe todo el espacio
  },
});