import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Text, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';

const ButtonAction = forwardRef((props, ref) => {
  const [photos, setPhotos] = useState<string[]>([]);

  // Función para cargar las fotos del directorio local
  const loadPhotos = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
      const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
      setPhotos(imageFiles); // Actualizar las fotos en el estado
    } catch (error) {
      console.error('Error al cargar las fotos:', error);
      Alert.alert('Error', 'No se pudieron cargar las fotos');
    }
  };

  // Exponer el método loadPhotos al componente padre a través de ref
  useImperativeHandle(ref, () => ({
    loadPhotos,
  }));

  useEffect(() => {
    loadPhotos(); // Cargar las fotos al montar el componente
  }, []);

  // Función para leer el nombre de la imagen en voz alta
  const handleSpeak = (fileName: string) => {
    const textToSpeak = `${fileName.replace(/\.(jpg|png)$/, '')}`;
    Speech.speak(textToSpeak);
  };

  // Función para eliminar una imagen
  const handleDelete = (fileUri: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que deseas eliminar esta imagen?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(fileUri);
              loadPhotos(); // Volver a cargar las fotos después de eliminar
              Alert.alert('Imagen eliminada');
            } catch (error) {
              console.error('Error al eliminar la imagen:', error);
              Alert.alert('Error', 'No se pudo eliminar la imagen');
            }
          },
        },
      ]
    );
  };

  // Función para manejar el botón adicional
  const handleYoQuiero = () => {
    Speech.speak("Yo quiero");
  };

  return (
    <View style={styles.container}>
      {/* Botón adicional que dice "Yo quiero" */}
      <TouchableOpacity style={styles.extraButton} onPress={handleYoQuiero}>
        <Text style={styles.buttonText}>Yo quiero</Text>
      </TouchableOpacity>

      {/* Línea divisoria */}
      <View style={styles.separator} />

      {/* ScrollView para las imágenes */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.flexContainer}>
          {photos.map((photoName, index) => {
            const fileUri = `${FileSystem.documentDirectory}${photoName}`;

            return (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleSpeak(photoName)} // Leer la imagen al hacer clic
                onLongPress={() => handleDelete(fileUri)} // Eliminar la imagen al mantener presionado
                delayLongPress={1000} // 1 segundo para activar la eliminación
              >
                <Image source={{ uri: fileUri }} style={styles.image} resizeMode="cover" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

export default ButtonAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
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
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  extraButton: {
    width: 90,  // Botón cuadrado (mismo ancho y alto)
    height: 90, // Altura igual que el ancho para que sea cuadrado
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center', // Centrar el botón horizontalmente
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1, // Para ocupar el resto del espacio disponible
  },
});
