import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, Button, ScrollView, TextInput, Pressable } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import image from '../../assets/backgrounds/fondo3.jpg'
import ReceAppstyles from '../style/style.js'

const BASE_URL = `http://localhost:8000`

export default function MyInventory({navigation}) {

  const [inventario, setInventario] = useState([])
  const [elementosTotalesInventario, setElementosLista] = useState([])
  const [inventoryUnit, setUnit] = useState("Kg")
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
    console.log(inventoryElement)
    const found = inventario.find(e => e.ingredient.name == inventoryElement.name)
    console.log(inventario)
    console.log(found)
    if(!found){
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
  }

  async function savePickedValue(id){
    console.log(id)
    const element = elementosTotalesInventario.find(e => e.id == id)
    setElement(element)
    setUnit(element.unit)
  }


  return (
    <ImageBackground source={image} style={styles.background}>
    <View>
      <Text style={styles.title}>Mi Inventario</Text>

      <Text style={styles.maintext}>
          Mantene siempre al día tu inventario
          Asi podemos ofrecerte las mas ricas comidas
          sin gastar un peso de mas !.
        </Text>

      <ScrollView 
      style={{
        paddingTop: 20,
        paddingLeft: 30,
        paddingBottom: 100,
        height: '50%'}}>
          {
              inventario.map((item, index) =>(
                  <View key={index}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight:'bold',
                        color:'white'
                      }}>

                        {item.ingredient.name} :

                       <Text
                       style={{
                        fontSize: 13,
                        fontWeight:'normal',
                        position:"absolute",
                        right:30,
                        color:'white'
                      }}> 

                        {item.amount}  

                          <Text
                          style={{
                            fontSize: 13,
                            fontWeight:'normal',
                            textAlign:'center',
                          }}> 
                         - 
                         {item.ingredient.unit}

                      <Pressable  style={styles.button} key={index} onPress={() => eliminarElemento(item.ingredient.id)}>
                        <Text>{"Eliminar"}</Text>
                      </Pressable>
                      </Text>
                       </Text>
                          </Text>
                  </View>
              ))
          }
      </ScrollView>

      <Text style={styles.maintext}>
          Añadí un nuevo elemento
      </Text>
      

      <Picker
      style={{ height: 20, width: 80, marginLeft:30, flex: 1, flexDirection: 'row'}}
      mode = "dropdown"
      selectedValue={elementosTotalesInventario.name}
      onValueChange={(value) => {
        savePickedValue(value)
      }}
      >
        {
        elementosTotalesInventario.map( (v,index)=>{
        return <Picker.Item 
        key = {index} label={v.name} value={v.id} />
        })
      }
      </Picker>


      <TextInput style = {{

      }}
      style={{ height: 50, width: 100, paddingLeft:30, flex: 1, flexDirection: 'row' }}
        value={inventoryUnit}
        editable={false}
      />

      <TextInput 
            style={{ height: 50, width: 100, paddingLeft:30, flex: 1, flexDirection: 'row' }}
                value={amountValue}
                placeholder={'Cantidad'}
                onChangeText={setAmount}
      />
      <Button
        title={'Add to Inventory'}
        onPress={() => addInventoryElement(inventoryElement,amountValue)}
      />

    <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    marginBottom: 2,
    marginTop: 30,
    color: 'white'    
  },
  maintext: {    
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    color: 'white'
  },
  text: {    
    textAlign: 'center',
    color: 'white'
  },
  filter: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    width: 300,
    height: 25
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: 'white',
    marginLeft: 80,
    height: '30%',
    width: '20%',
    fontSize: 8,
    color: 'black'
  },

});

