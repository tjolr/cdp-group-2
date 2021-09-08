import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const GameOverScreen = ({ navigation }: NavigationScreenProps) => {
  const handleMainMenuPress = () => navigation.navigate('MainMenu');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>GameOver screen</Text>
      <Button onPress={handleMainMenuPress} title="MainMenu" />
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

export default GameOverScreen;
