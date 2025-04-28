// HomeScreen.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, GestureResponderEvent} from 'react-native';


type ButonProps={
    title:string,
    onPress: (event:GestureResponderEvent) => void,
    size?:number,
}

export const ButtonTalk = ({title, size,onPress}:ButonProps ) =>{
    
    

    return(
<TouchableOpacity
  style={[
    styles.button,
    { width: size, height: size, borderRadius: size * 0.2 },
  ]}
  onPress={onPress}  
>
  <Text>{title}</Text>
</TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2f95dc',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    disabled: {
      backgroundColor: '#a0a0a0',
    },
    text: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
  });

