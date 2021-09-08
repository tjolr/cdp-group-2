import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';

const LoginScreen = ({ navigation }: NavigationScreenProps) => {
  const handleLoginPress = () => navigation.navigate('MainMenu');

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button onPress={handleLoginPress} title="Login" />
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

export default LoginScreen;
