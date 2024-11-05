import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface GuardarImagenProps {
  onNewImageSaved: () => void; // Callback que se ejecuta cuando se guarda una nueva imagen
}

const SaveImage: React.FC<GuardarImagenProps> = ({ onNewImageSaved }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>(''); // Estado para el nombre personalizado de la imagen

  // Función para seleccionar una imagen de la galería
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

  // Función para guardar la imagen con el nombre personalizado
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
      
      // Notificar si la función onNewImageSaved está disponible
      if (onNewImageSaved) {
        onNewImageSaved();
      }

      // Reiniciar valores
      setSelectedImage(null);
      setImageName('');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
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
      <Button title="Guardar Imagen" onPress={saveImage} disabled={!selectedImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
});

export default SaveImage;
