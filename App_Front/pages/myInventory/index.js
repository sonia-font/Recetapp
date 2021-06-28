import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';;
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

const BASE_URL = `http://localhost:8000`

export default function MyInventory({navigation}) {

  const [inventario, setInventario] = useState([])

  //const user = await AsyncStorage.getData('@userData')
  const user = {
    id: 0
  }

  useEffect(()=>{
    fetch(`${BASE_URL}/users/${user.id}/inventory`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        setInventario(data)
    })
  }, [])

  async function eliminarElemento(id){
    fetch(`${BASE_URL}/users/${user.id}/inventory/${id}`)
    .then(res => {
        return res.json()
    })
  }

  return (
    <View style={styles.container}>
      <Text>Mi inventario</Text>
      <ScrollView>
          {
              inventario.map((item, index) =>(
                  <View key={index}>
                      <Text>{item.ingredient.name} - {item.ingredient.unit} - {item.amount} </Text>
                      <Button className={'button center'} title={'Delete'} key={index} onPress={() => eliminarElemento(item.ingredient.id)} />
                  </View>
              ))
          }      
      </ScrollView>
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
