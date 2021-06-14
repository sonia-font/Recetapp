import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function WeeklyPlan({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Plan Semanal</Text>
      <StatusBar style="auto" />

      <Button
      title={'Go back'}
      onPress={() => navigation.goBack()}
      />

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
