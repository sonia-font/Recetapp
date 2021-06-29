import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, Text, View, FlatList, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground, Image } from 'react-native';
import ReceAppstyles from '../style/style';
import image from '../../assets/backgrounds/base2.jpg'

const BASE_URL = `http://192.168.30.81:8000`;

export default function EatNow({navigation}) {

  const [recipes, setRecipes] = useState([])

  const renderItem = ({item})=>{
    return (
      <View>
        <TouchableOpacity
            style={[ReceAppstyles.card, ReceAppstyles.background]}
            onPress={() => navigation.navigate('recipeDetail',{item})}
          >
          <Image
            style={[ReceAppstyles.imagesRece, {flex:2}]}
            source={{
              uri: item.image,
            }}
          />
      
          <View style={{flex:3}}>
            <Text style={ReceAppstyles.text_titulo_card}>{item.title}</Text>
            <Text>Caracteristicas: {item.characteristics}</Text>
            <Text>Ingredientes:</Text>
            <FlatList
              data={item.stockIngredients}
              renderItem= { ({item}) => {
                return <Text>-{item.amount} {item.ingredient.name}</Text>
              }}
              keyExtractor={item => item.ingredient.id.toString()}
            />
          </View>
    
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
    })
  }, [])


  return (
    <ImageBackground source={image} style={ReceAppstyles.image}> 
      <View style={[ReceAppstyles.container, ReceAppstyles.container_transparent]}>
        
        <SafeAreaView >
          <Text style={[ReceAppstyles.title, {textAlign:'center'}]}>Que como?</Text>
          <FlatList
            data={recipes}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            
          />
        </SafeAreaView>
        <StatusBar backgroundColor="#ffffff"/>
      </View>
    </ImageBackground> 
  );
}
