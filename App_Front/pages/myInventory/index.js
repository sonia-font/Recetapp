import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const BASE_URL = `http://localhost:8000/`

export default function MyInventory({navigation}) {

  useEffect(()=>{
    fetch(`${BASE_URL}/users`,)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        setVehiculos(data)
    })

  }, [])




  return (
    <View style={styles.container}>
      <Text>Mi inventario</Text>
      <Button
      title={'Go back'}
      onPress={() => navigation.goBack()}
      />
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
