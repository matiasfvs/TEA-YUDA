import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface GuardarImagenProps {
  onNewImageSaved: () => void;
}

const SaveImage: React.FC<GuardarImagenProps> = ({ onNewImageSaved }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Es necesario permitir el acceso a la galería');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('Selección cancelada', 'No se seleccionó ninguna imagen');
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Es necesario permitir el acceso a la cámara');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('Captura cancelada', 'No se tomó ninguna foto');
    }
  };

  const saveImage = async () => {
    if (!selectedImage) {
      Alert.alert('No se seleccionó ninguna imagen');
      return;
    }
    if (!imageName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingrese un nombre para la imagen.');
      return;
    }
    const fileUri = `${FileSystem.documentDirectory}${imageName}.jpg`;
    try {
      await FileSystem.copyAsync({
        from: selectedImage,
        to: fileUri,
      });
      Alert.alert('Imagen guardada', `Imagen guardada en: ${fileUri}`);
      if (onNewImageSaved) {
        onNewImageSaved();
      }
      setSelectedImage(null);
      setImageName('');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.primaryButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen de Galería</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto con Cámara</Text>
      </TouchableOpacity>
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TextInput
            style={styles.input}
            placeholder="Ingrese un nombre para la imagen"
            value={imageName}
            onChangeText={setImageName}
          />
        </>
      )}
      <TouchableOpacity
        style={[styles.primaryButton, selectedImage ? {} : styles.disabledButton]}
        onPress={saveImage}
        disabled={!selectedImage}
      >
        <Text style={styles.buttonText}>Guardar Imagen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6a92c3', // Fondo oscuro
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#d884f4', // Botón principal
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#9bb5d3', // Botón secundario
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#d3ca9b', // Botón deshabilitado
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#cfffca', // Fondo claro para el input
  },
});

export default SaveImage;
