import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '../../utils/AsyncStorage';
import ReceAppstyles from '../style/style';

export default function Home({navigation}) {

  const [authenticated, setAuthenticated] = useState(false)  

  const checkUser = async () =>{
    console.log('Vamos a ver si existe data')

    const user = await AsyncStorage.getData('@userData')
    console.log({user})
    if (user){
      setAuthenticated(true)  
    }
  }
  const applyLogout= async() =>{
    AsyncStorage.clearData()
    setAuthenticated(false)
  }

  const changeAuthenticated = (value) => {
    setAuthenticated(value)
  }


  useEffect(() => {
    checkUser()
  }, [])

  return (
    <View style={[styles.container]}>
      {
        authenticated ? 
        (
          <View>
          <TouchableOpacity
            style={[ReceAppstyles.big_btn, ReceAppstyles.bcg_green]}
            onPress={() => navigation.navigate('EatNow')}
          >
            <Text style={ReceAppstyles.text_titulo}> ¿Y ahora que como? </Text>
            <Text style={ReceAppstyles.text_paragraph}>Recetas para cada momento del dia</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
          style={[ReceAppstyles.big_btn, ReceAppstyles.bcg_red]}
            onPress={() => navigation.navigate('MyInventory')}
            >
            <Text style={ReceAppstyles.text_titulo}> Mi heladera </Text>
            <Text style={ReceAppstyles.text_paragraph}>Manten tu inventario actualizado!</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
          style={[ReceAppstyles.big_btn, ReceAppstyles.bcg_blue]}
            onPress={() => navigation.navigate('WeeklyPlan')}
            >
            <Text style={ReceAppstyles.text_titulo}> Plan Semanal </Text>
            <Text style={ReceAppstyles.text_paragraph}>Planifica tu semana y llevate tu lista de compras</Text>
          </TouchableOpacity>
      
        </View> 
        )
        : 
        (<Button
          title={'Login'}
          onPress={() => navigation.navigate('Login',{changeAuthenticated})}
      />)
    }
      {/* <Button
         title={'Desloguear'}
        onPress={applyLogout}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  }
});
