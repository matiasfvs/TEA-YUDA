import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ButtonAction = forwardRef((props, ref) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);

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
              // Mostrar indicador de carga
              setDeleting(true);
              await FileSystem.deleteAsync(fileUri);
              loadPhotos(); // Volver a cargar las fotos después de eliminar
              Alert.alert('Imagen eliminada');
            } catch (error) {
              console.error('Error al eliminar la imagen:', error);
              Alert.alert('Error', 'No se pudo eliminar la imagen');
            } finally {
              // Ocultar indicador de carga
              setDeleting(false);
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
        <Text style={styles.buttonText}>Yo quiero </Text><FontAwesome name="child" size={25} color="white" />
      </TouchableOpacity>

      {/* Línea divisoria */}
      <View style={styles.separator} />

      {/* ScrollView para las imágenes */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.flexContainer}>
          {deleting && <ActivityIndicator size="large" color="#0000ff" />}
          {photos.map((photoName, index) => {
            const fileUri = `${FileSystem.documentDirectory}${photoName}`;

            return (
              <View>
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleSpeak(photoName)} // Leer la imagen al hacer clic
                onLongPress={() => handleDelete(fileUri)} // Eliminar la imagen al mantener presionado
                delayLongPress={1000} // 1 segundo para activar la eliminación
              >
                <Image source={{ uri: fileUri }} style={styles.image} resizeMode="cover" />
              </TouchableOpacity>
              <Text style={styles.photoName}>{photoName.replace(/\.(jpg|png)$/, '')}</Text>
              </View>
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
    backgroundColor: '#6a92c3', // Fondo verde oscuro
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Aseguramos que no sobrescriba el fondo
  },
  scrollContent: {
    paddingBottom: 20, // Para añadir espacio al final si es necesario
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
    borderColor: '#d3ca9b',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#4f6d92',
    marginVertical: 20,
  },
  extraButton: {
    width: 200, // Botón cuadrado (mismo ancho y alto)
    height: 90, // Altura igual que el ancho para que sea cuadrado
    backgroundColor: '#d884f4',
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
  photoName:{
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});