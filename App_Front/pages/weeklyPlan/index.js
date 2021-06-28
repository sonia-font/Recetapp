import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import image from '../../assets/backgrounds/fondo2.jpg'

const BASE_URL = `http://192.168.30.81:8000`

export default function WeeklyPlan({navigation}) {

  const [keyWord, setKeyWord] = useState()
  const [maxIngredients, setMaxIngredients] = useState()
  const [maxTime, setMaxTime] = useState()
  const [difficulty, setDifficulty] = useState()

  //const user = await AsyncStorage.getData('@userData')
  const user = {
    id: 0
  }

  const pedirPlan = async (userId, keyword, maxIngredients, maxTime, difficulty) => {
    fetch(`${BASE_URL}/recipes/plan/${userId}?keyWord=${keyword}&maxIngredients=${maxIngredients}&maxTime=${maxTime}&difficulty=${difficulty}`, {method: 'POST'})
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (    
    <ImageBackground source={image} style={styles.image}>      
      <View style={styles.container}> 
        <Text style={styles.title}>Plan Semanal</Text>
        <StatusBar backgroundColor="#ffffff"/>

        <Text style={styles.maintext}>
          ¡No pierdas mas tiempo pensando en que comer!
          Selecciona con los filtros de abajo tus preferencias 
          y te mandamos por mail un plan semanal.
        </Text>
        
        <Text style={styles.text}>Palabra clave a buscar:</Text>
        <TextInput 
          style={styles.filter}
          value={keyWord}
          placeholder={'  Palabra clave'}
          onChangeText={setKeyWord}
        />

        <Text style={styles.text}>Maxima cantidad de ingredientes:</Text>
        <View style={styles.filter}>        
          <Picker
            style={{width: 300, height: 25}}
            selectedValue={maxIngredients}
            onValueChange={(itemValue, itemIndex) =>
              setMaxIngredients(itemValue)
            }>
            <Picker.Item label="No filtrar" value="" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="4" value="4" />        
          </Picker>
        </View>

        <Text style={styles.text}>Maxima duracion de preparacion (min):</Text>
        <View style={styles.filter}> 
          <Picker
            style={{width: 300, height: 25}}
            selectedValue={maxTime}
            onValueChange={(itemValue, itemIndex) =>
              setMaxTime(itemValue)
            }>
            <Picker.Item label="No filtrar" value="" />
            <Picker.Item label="120" value="120" />
            <Picker.Item label="60" value="60" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="15" value="15" />        
          </Picker>
        </View>
        
        <Text style={styles.text}>Dificultad:</Text>
        <View style={styles.filter}> 
          <Picker
            style={{width: 300, height: 25}}
            selectedValue={difficulty}
            onValueChange={(itemValue, itemIndex) =>
              setDifficulty(itemValue)
            }>
            <Picker.Item label="No filtrar" value="" />
            <Picker.Item label="Facil" value="Facil" />
            <Picker.Item label="Medio" value="Medio" />
            <Picker.Item label="Dificil" value="Dificil" />        
          </Picker>
        </View>

        <Button 
        color="#696969"
        title={'Arma tu plan'}
        onPress={() => pedirPlan(user.id, keyWord, maxIngredients, maxTime, difficulty)}
        />        
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
