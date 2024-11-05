import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/screens/splashScreen';
import { useEffect, useState } from 'react';
import HomeScreen from './src/screens/homeScreen';

export default function App() {

  const[isLoading,setIsLoading] = useState(true);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setIsLoading(false)
    },4000)

    return()=>clearTimeout(timer)
  })

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
