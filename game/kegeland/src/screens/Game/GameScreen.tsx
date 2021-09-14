import React from 'react';
import { GameEngine } from 'react-native-game-engine';
import entities from '../../../entities';
import Physics from '../../../physics';

const GameScreen = () => {
  return (
    <GameEngine
      entities={entities()}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      systems={[Physics]}
    ></GameEngine>
  );
};

export default GameScreen;
