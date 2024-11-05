import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface DeleteButtonProps {
  fileUri: string; // Ruta de la imagen
  onDelete: () => void; // Función que se llama después de la eliminación
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ fileUri, onDelete }) => {
  // Función para manejar la eliminación de la imagen
  const handleDelete = async () => {
    // Mostrar una alerta de confirmación antes de eliminar
    Alert.alert(
      "Confirmar eliminación",
      "¿Seguro que deseas eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(fileUri);
              Alert.alert("Imagen eliminada");
              onDelete(); // Llamar a la función onDelete para actualizar la lista
            } catch (error) {
              console.error('Error al eliminar la imagen:', error);
              Alert.alert('Error', 'No se pudo eliminar la imagen');
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onLongPress={handleDelete} // Eliminar cuando se mantenga presionado
      delayLongPress={1000} // 1 segundo de duración del toque
    >
      <Image source={{ uri: fileUri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    backgroundColor: '#f9d6bf',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
