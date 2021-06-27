import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '../../utils/AsyncStorage';

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
    <View style={styles.container}>
      <Text>Home</Text>
      {
        authenticated ? 
        (<Button
          title={'Desloguear'}
          onPress={applyLogout}
        />
        )
        : 
        (<Button
          title={'Login'}
          onPress={() => navigation.navigate('Login',{changeAuthenticated})}
      />)
    }
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
  },
});
