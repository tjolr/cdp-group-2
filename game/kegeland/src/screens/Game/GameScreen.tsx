import { Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { GameEngine } from 'react-native-game-engine';
import { SafeAreaView } from 'react-native-safe-area-context';
import entities from '../../../entities';
import Physics from '../../../physics';
import { NavigationScreenProps } from '../navigation.types';

const GameScreen = ({ navigation }: NavigationScreenProps) => {
  const handleGameOver = () => {
    setRunning(false);
    navigation.navigate('GameOver');
  };
  const [lives, setLives] = useState(3);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (lives === 0) handleGameOver();
  }, [lives]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
        }}
      >
        Lives: {lives}
      </Text>
      <GameEngine
        entities={entities()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        systems={[Physics]}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case 'hit_obstacle':
              setLives(lives - 1);
          }
        }}
      ></GameEngine>
    </SafeAreaView>
  );
};

export default GameScreen;
