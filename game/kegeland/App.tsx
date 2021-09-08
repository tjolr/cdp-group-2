import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import GameScreen from './src/screens/Game/GameScreen';
import GameOverScreen from './src/screens/GameOver/GameOverScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import MainMenuScreen from './src/screens/MainMenu/MainMenuScreen';
import { store } from './state-management/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="GameOver" component={GameOverScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
