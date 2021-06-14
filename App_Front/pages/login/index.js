import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Login({navigation}) {

    const[nombre, setNombre] = useState('')



  return (
    <View style={styles.container}>
      <Text>Login</Text>

        <TextInput>
            value = {nombre}
            
        </TextInput>


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
