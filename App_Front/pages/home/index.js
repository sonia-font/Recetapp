import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import { ImageBackground, Image, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '../../utils/AsyncStorage';
import ReceAppstyles from '../style/style';
import homeImage from '../../assets/backgrounds/fondo4.jpg'
import loginImage from '../../assets/backgrounds/extra3.jpg'

export default function Home({navigation}) {

  const [authenticated, setAuthenticated] = useState(false)  
  const [image, setImage] = useState(false) 

  const changeBackground = (authenticated) => {
    if (authenticated) {
      setImage(homeImage)
    } else {
      setImage(loginImage)
    }
  }

  const checkUser = async () =>{
    console.log('Vamos a ver si existe data')

    const user = await AsyncStorage.getData('@userData')
    console.log({user})
    if (user){
      setAuthenticated(true)  
      changeBackground(true)
    }
  }
  const applyLogout= async() =>{
    AsyncStorage.clearData()
    setAuthenticated(false)
    changeBackground(false)
  }

  const changeAuthenticated = (value) => {
    setAuthenticated(value)
    changeBackground(value)
  }

  useEffect(() => {
    checkUser()
    changeBackground(authenticated)
  }, [])

  return (
    <ImageBackground source={image} style={styles.background}> 
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff"/>
        {
          authenticated ? 
          (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('EatNow')}>
                <Image source={require('../../assets/buttons/botonQueComo.jpg')} style={styles.image}/>
              </TouchableOpacity>
          
              <TouchableOpacity onPress={() => navigation.navigate('MyInventory')}>
                <Image source={require('../../assets/buttons/botonHeladera.jpg')} style={styles.image} />
              </TouchableOpacity>
          
              <TouchableOpacity onPress={() => navigation.navigate('WeeklyPlan')}>
                <Image source={require('../../assets/buttons/botonPlan.jpg')} style={styles.image} />
              </TouchableOpacity> 

              <Button
                color="#696969"
                title={'Desloguear'}
                onPress={applyLogout}/>

            </View> 
          )
          : 
          ( 
            <Button
            color="#696969"
            title={'Iniciar Sesion'}
            onPress={() => navigation.navigate('Login',{changeAuthenticated})}/>            
          )
        }        
      </View>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100
  },
  image: {
    height: 230,
    width: 270,
    resizeMode: 'contain',
    marginBottom: -60,
    borderRadius: 35
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center'
  }
});
