import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-google-app-auth'
import AsyncStorage from '../../utils/AsyncStorage';

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

        AsyncStorage.storeData('@userData', user)
        console.log(changeAuthenticated)
        changeAuthenticated(true)
        
        /* Log-Out */
        await Google.logOutAsync({ accessToken, ...config });
        /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
    }
}
  return (
    <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={signInWithGoogle}
                style={styles.buttonGoogleStyle}
            >
                <Image
                    source={require('../../assets/btn_google_signin.png')}
                />
            </TouchableOpacity>

            <Button
            title={'Go back'}
            onPress={() => navigation.goBack()}
            />
        </View>
  );
}

/*<Button
title={'Go back'}
onPress={() => navigation.goBack()}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
