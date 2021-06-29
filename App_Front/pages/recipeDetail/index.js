import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native';
import ReceAppstyles from '../style/style';
import image from '../../assets/backgrounds/base1.jpg'



export default function recipeDetail({navigation, route}) {

    const {item} = route.params || {item : ""}
  
    const generatePdf = () => {

    }


    return (
    <ImageBackground source={image} style={ReceAppstyles.image}> 
    <View style={[ReceAppstyles.container, ReceAppstyles.container_transparent, {flex: 1, flexDirection:'column'}]}>
        <Text style={[styles.titledetail, {flex: 1}]}>{item.title}</Text>
        <View style={{flex:7, flexDirection:'row'}}>
          <Image
            style={[ReceAppstyles.big_imagesRece, {flex:3, marginRight: 30}]}
            source={{
              uri: item.image,
            }}
          />
          <View style={[{flex:3}]}>
            <Text style={[ReceAppstyles.text_titulo_card,{color: '#efecff', fontSize: 24 }]}>Caracteristicas</Text>
            <Text style={styles.text}>{item.characteristics}</Text>
            <Text style={[ReceAppstyles.text_titulo_card,{color: '#efecff', fontSize: 24 }]}>Porcion</Text>
            <Text style={styles.text}> {item.plates}</Text>
            <Text style={[ReceAppstyles.text_titulo_card,{color: '#efecff', fontSize: 24 }]}>Ingredientes:</Text>
            <FlatList
              data={item.stockIngredients}
              renderItem= { ({item}) => {
                return <Text style={styles.text}>-{item.amount} {item.ingredient.name}</Text>
              }}
              keyExtractor={item => item.ingredient.id.toString()}
            />
          </View>
        </View>
        <TouchableOpacity 
        style={[ReceAppstyles.small_btn, ReceAppstyles.bcg_blue,{marginBottom:30}]}
        onPress={generatePdf}
        >
          <Text style={[styles.text, {textAlign: 'center', marginTop: 17}]}>Generar Lista Ingredientes</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
    </ImageBackground>
    );
}


const styles = StyleSheet.create({
  titledetail: {
    color: '#efecff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 27
  },
  text:{
    color: '#efecff',
    fontSize: 20
  }
})