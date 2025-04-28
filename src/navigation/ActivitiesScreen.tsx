// ActivitiesScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de ACTIVIDADES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"red"
    },
  });