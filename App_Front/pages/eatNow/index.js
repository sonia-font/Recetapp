import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import ReceAppstyles from '../style/style';

const BASE_URL = `http://192.168.0.14:8000`;

export default function EatNow({navigation}) {



  const [recipes, setRecipes] = useState([])

  const renderItem = ({item})=>{
    return (
      <View>
        <TouchableOpacity
            style={[ReceAppstyles.big_btn, ReceAppstyles.bcg_green]}
            onPress={() => navigation.navigate('recipeDetail',{item})}
          >
          <Text>Receta : {item.title}</Text>
          <Text>Caracteristicas: {item.characteristics}</Text>
          <Text>Ingridientes</Text>
          <FlatList
            data={item.stockIngredients}
            renderItem= { ({item}) => {
              return <Text>{item.ingredient.name}</Text>
            }}
            keyExtractor={item => item.ingredient.id.toString()}
          />
        </TouchableOpacity>
      </View>

    )
  } 
  
  useEffect(()=>{
    fetch(`${BASE_URL}/recipes/`)
    .then(res => {
        return res.json()
    })
    .then(data => {
      setRecipes(data)
      console.log(data)
    })
  }, [])


  return (
    <View style={styles.container}>
      <Text>Que como?</Text>
      <ScrollView>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
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
