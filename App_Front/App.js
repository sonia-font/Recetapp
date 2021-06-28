import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EatNow from "./pages/eatNow";
import Home from "./pages/home";
import Login from "./pages/login";
import MyInventory from "./pages/myInventory";
import Recipes from "./pages/recipes";
import SignUp from "./pages/signUp";
import WeeklyPlan from "./pages/weeklyPlan";
import recipeDetail from "./pages/recipeDetail";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white'
        }}>
        <Stack.Screen name = { 'Home' } component = {Home}  options = { {title: 'Recetapp'} }/>
        <Stack.Screen name = { 'Login' } component = {Login}  options = { {title: 'Indentificate'} }/>
        <Stack.Screen name = { 'SignUp' } component = {SignUp}  options = { {title: 'Registro'} }/>
        <Stack.Screen name = { 'MyInventory' } component = {MyInventory}  options = { {title: 'Mi Heladera'} }/>
        <Stack.Screen name = { 'EatNow' } component = {EatNow}  options = { {title: 'Que comemos?'} }/>
        <Stack.Screen name = { 'WeeklyPlan' } component = {WeeklyPlan}  options = { {title: 'Plan Semanal'} }/>
        <Stack.Screen name = { 'Recipies ' } component = {Recipies}  options = { {title: 'Recetas'} }/>
        <Stack.Screen name = { 'recipeDetail' } component = {recipeDetail}  options = { {title: 'detalle de receta'} }/>
      </Stack.Navigator>
    </NavigationContainer>
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
