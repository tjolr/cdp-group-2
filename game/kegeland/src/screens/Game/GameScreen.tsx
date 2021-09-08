import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationScreenProps } from "../navigation.types";
import { GameEngine } from "react-native-game-engine"
import entities from "../../../entities";


const GameScreen = ({ navigation }: NavigationScreenProps) => {
  const handleGameOverPress = () => navigation.navigate('GameOver');

  return (
    <GameEngine
      entities={entities()}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      
    </GameEngine>
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
