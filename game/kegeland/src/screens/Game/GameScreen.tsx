import { Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import React, { useEffect } from 'react';
import { GameEngine } from 'react-native-game-engine';
import entities from '../../../entities';

import {
  incrementPoints,
  livesSel,
  pointsSel,
  decrementLives,
  restoreLives,
  runningSel,
  stopGame,
  controlsSel,
} from '../../../state-management/game/gameSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { NavigationScreenProps } from '../navigation.types';
import { useRoute } from '@react-navigation/native';
import Background from '../../../assets/hills.png';

const GameScreen = ({ navigation }: NavigationScreenProps) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const points = useAppSelector(pointsSel);
  const lives = useAppSelector(livesSel);
  const running = useAppSelector(runningSel);
  const controls = useAppSelector(controlsSel);

  const handleGameOver = () => {
    dispatch(stopGame());
    navigation.navigate('GameOver');
    dispatch(restoreLives());
  };

  useEffect(() => {
    if (lives === 0) handleGameOver();
  }, [lives]);

  return (
    <ImageBackground source={Background} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            top: 45,
          }}
        >
          Lives: {lives}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            top: 50,
          }}
        >
          Points: {points}
        </Text>
      </View>
      <GameEngine
        entities={entities()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        systems={[controls]}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case 'hit_obstacle':
              dispatch(decrementLives());
              break;
            case 'new_point':
              dispatch(incrementPoints());
              break;
          }
        }}
      ></GameEngine>
    </ImageBackground>
  );
};

export default GameScreen;
