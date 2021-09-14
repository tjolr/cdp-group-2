import React from 'react';
import { GameEngine } from 'react-native-game-engine';
import entities from '../../../entities';
import Physics from '../../../physics';

const GameScreen = () => {
  return (
    <GameEngine
      entities={entities()}
      style={{ width: '100%', height: '100%' }}
      systems={[Physics]}
    ></GameEngine>
  );
};

export default GameScreen;
