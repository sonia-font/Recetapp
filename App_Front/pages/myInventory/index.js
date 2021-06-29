import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker'

const BASE_URL = `http://localhost:8000`

export default function MyInventory({navigation}) {

  const [inventario, setInventario] = useState([])
  const [elementosTotalesInventario, setElementosLista] = useState([])
  const [inventoryUnit, setUnit] = useState([])
  const [inventoryElement, setElement] = useState()
  const [amountValue, setAmount] = useState(0)

  //const user = await AsyncStorage.getData('@userData')
  const user = {
    id: 0
  }

  useEffect(()=>{
    popularInventarioRecetas()
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
    .then(data => {
      setInventario(data)
  })
  }

  async function popularInventarioRecetas(){
    fetch(`${BASE_URL}/ingredients/`)
    .then(res => {
        return res.json()
    })
    .then(data => {
      console.log(data)
      setElementosLista(data)
    })
  }

  async function addInventoryElement(inventoryElement,amountValue){
    const userElement = {
      ingredient: {
        name: inventoryElement.name,
        unit: inventoryElement.unit,
      },
      amount: parseInt(amountValue)
    }
    setInventario([...inventario,userElement])
    fetch(`${BASE_URL}/users/${user.id}/inventory/`,{
      method: 'POST',
      body: JSON.stringify(userElement),
      headers:{
        'Content-Type': 'application/json'
      }
        })
    .then(res => {
        return res.json()
    })
  }

  async function savePickedValue(id){
    console.log(id)
    const element = elementosTotalesInventario.find(e => e.id == id)
    setElement(element)
    setUnit(element.unit)
  }


  return (
    <View style={styles.container}>
      <Text>Mi inventario</Text>
      <ScrollView style={{paddingTop: 50}}>
          {
              inventario.map((item, index) =>(
                  <View key={index}>
                      <Text>{item.ingredient.name}</Text>
                      <Text>{item.amount}</Text>
                      <Text>{item.ingredient.unit}</Text>
                      <Button className={'button center'} title={'Delete'} key={index} onPress={() => eliminarElemento(item.ingredient.id)} />
                  </View>
              ))
          }
      </ScrollView>


      <Picker
      style={{ height: 50, width: 100 }}
      selectedValue={elementosTotalesInventario.name}
      onValueChange={(value) => {
        savePickedValue(value)
      }}
      >{
        elementosTotalesInventario.map( (v,index)=>{
        return <Picker.Item key = {index} label={v.name} value={v.id} />
        })
      }
      </Picker>


      <TextInput
      style={{ height: 50, width: 100 }}
        value={inventoryUnit}
        editable={false}
      />

      <TextInput 
                value={amountValue}
                placeholder={'Cantidad'}
                onChangeText={setAmount}
      />

      <Button
        title={'Add to Inventory'}
        onPress={() => addInventoryElement(inventoryElement,amountValue)}
      />

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
