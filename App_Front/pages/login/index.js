import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-google-app-auth'
import AsyncStorage from '../../utils/AsyncStorage';
import loginImage from '../../assets/backgrounds/extra3.jpg'

const BASE_URL = `http://localhost:8000`

export default function Login({navigation,route}) {

  const [usuario, setUsuario] = useState()
  const {changeAuthenticated} = route.params || {changeAuthenticated : ""}
  
  const signInWithGoogle = async () => {
    console.log('Aqui nos conectamos!')

    const config = {
      iosClientId: `464907142406-hpgftgb327vkrs3set9as4729tomn7fb.apps.googleusercontent.com  `,
      androidClientId: `464907142406-u181st6f0tjpqqc7ustoppqdgkif6m41.apps.googleusercontent.com`
    };
    const result = await Google.logInAsync(config);
    const { type, accessToken, user } = result
    
    if (type === 'success') {

        //--Guardar el ID del usuario en memoria para ser utilizado luego por la aplicacion.--
        //Hacemos un post con los datos del user para guardarlo (o no) en BD.
        //Get by Email que devuelve el id del usuario.

        fetch(`${BASE_URL}/users/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: user.givenName,
            lastname: user.familyName,
            email: user.email
          })
        })
        .then(response => response.json())
        .then(user => 
          setUsuario(user),
          
        );

        await AsyncStorage.storeData('@userData',user)
        changeAuthenticated(true)
        navigation.goBack()
        
        /* Log-Out */
        await Google.logOutAsync({ accessToken, ...config });
        /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
    }
}
       
  return (
    <ImageBackground source={loginImage} style={styles.background}>
      <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff"/>
      {
        !usuario ? (
          <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={signInWithGoogle}
          style={styles.buttonGoogleStyle}
        >
          <Image
              source={require('../../assets/btn_google_signin.png')} style={styles.image}
          />
        </TouchableOpacity>
        <Button
        title={'HOME'}
        onPress={() => {
          changeAuthenticated(true)
          navigation.goBack()}}
        />
        </View>
        )
        :
        (navigation.navigate("Home"))
      }
      </View>
    </ImageBackground>
  );
}

/*<Button
title={'Go back'}
onPress={() => navigation.goBack()}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center'
  },
  image: {
    height: 100,
    width: 200,
    resizeMode: 'contain'
  },
});
