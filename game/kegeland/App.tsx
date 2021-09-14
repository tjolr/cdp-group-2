import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Provider as StoreProvider } from 'react-redux';
import GameScreen from './src/screens/Game/GameScreen';
import GameOverScreen from './src/screens/GameOver/GameOverScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import MainMenuScreen from './src/screens/MainMenu/MainMenuScreen';
import { theme } from './src/styles/theme';
import { store } from './state-management/store';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <NativeBaseProvider config={config} theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainMenu" component={MainMenuScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="GameOver" component={GameOverScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar hidden />
      </NativeBaseProvider>
    </StoreProvider>
  );
};

export default App;
