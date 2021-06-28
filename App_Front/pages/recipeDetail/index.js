import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '../../utils/AsyncStorage';
import ReceAppstyles from '../style/style';

export default function recipeDetail({navigation, route}) {

    const {item} = route.params || {item : ""}
 
    return (
    <View style={[styles.container]}>
        
        <Text>{item.title}</Text>
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

  }
});
