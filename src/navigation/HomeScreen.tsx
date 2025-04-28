// HomeScreen.tsx
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { ButtonTalk } from '../components/ui/ButtonTalk';
import * as Speech from 'expo-speech';

const butonsData=[
  {title:'Manzana', onPress:()=>Speech.speak('Manzana',{language:'es-ES'})},
  {title:'Naranja', onPress:()=>{console.log('Naranja')}},
  {title:'Platano', onPress:()=>{console.log('Platano')}},
  {title:'Huwu', onPress:()=>Speech.speak('Huwu',{language:'es-ES'})},
]

export const HomeScreen = () => (
  <ScrollView>
    <View style={styles.container}>
    <Text>¡Bienvenido a TEA-yuda!</Text>

    </View>
    <View style={styles.buttonsRow}>
    {butonsData.map((i,index)=>(
   <ButtonTalk 
   key={index}
   title={i.title} 
   onPress={i.onPress} 
   size={80}/>
   ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems:'center'
  },
  buttonsRow: {
    flexDirection: 'row',   // 🔥 ahora sí estarán en fila
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',        // para que bajen si no caben
    gap: 10,                 // si tu versión lo permite
    marginTop: 20,
  },
});