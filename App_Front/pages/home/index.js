import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
      title={'Login'}
      onPress={() => navigation.navigate('Login')}
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
