import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-google-app-auth'
import AsyncStorage from '../../utils/AsyncStorage';
import loginImage from '../../assets/backgrounds/extra3.jpg'



export default function Login({navigation,route}) {
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

        console.log('====================================');
        console.log(user);
        console.log('====================================');

        //--Guardar el ID del usuario en memoria para ser utilizado luego por la aplicacion.--
        //Hacemos un post con los datos del user para guardarlo (o no) en BD.
        //Get by Email que devuelve el id del usuario.

        // fetch('https://mywebsite.com/endpoint/', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     firstParam: 'yourValue',
        //     secondParam: 'yourOtherValue'
        //   })
         //.then(data => {
          //     const internalUser = data
          // })
        // });

        //AsyncStorage.storeData('@userData', internalUser)
        console.log(changeAuthenticated)
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
        title={'Que como?'}
        onPress={() => navigation.navigate('EatNow')}
        />
        <Button
        title={'Heladera'}
        onPress={() => navigation.navigate('MyInventory')}
        />
        <Button
        title={'Plan Semanal'}
        onPress={() => navigation.navigate('WeeklyPlan')}
        />     
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
