import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const GameScreen = ({ navigation }: NavigationScreenProps) => {
  const handleGameOverPress = () => navigation.navigate('GameOver');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Game screen</Text>
      <Button onPress={handleGameOverPress} title="GameOver" />
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

export default GameScreen;
