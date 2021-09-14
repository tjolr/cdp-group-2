import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const MainMenuScreen = ({ navigation }: NavigationScreenProps) => {
  const handleStartGamePress = () => navigation.navigate('Game');

  return (
    <View style={styles.container}>
      <Text>MainMenu screen</Text>
      <Button onPress={handleStartGamePress} title="Start game" />
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

export default MainMenuScreen;
