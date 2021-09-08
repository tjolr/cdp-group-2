import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const HomeScreen = ({ navigation }: NavigationScreenProps) => {
  const handleLoginPress = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Home Screen</Text>
      <Button onPress={handleLoginPress} title="Get started" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
