import { Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
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
  saveGameDataThunk,
  obstacleSpeedSel,
} from '../../../state-management/game/gameSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { NavigationScreenProps } from '../navigation.types';
import Background from '../../../assets/hills.png';
import UnderWaterBackground from '../../../assets/underwater-background.png';

const GameScreen = ({ route, navigation }: NavigationScreenProps) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const points = useAppSelector(pointsSel);
  const lives = useAppSelector(livesSel);
  const running = useAppSelector(runningSel);
  const controls = useAppSelector(controlsSel);
  const [backgroundImage, setBackgroundImage] = useState(Background);
  const obstacleSpeed = useAppSelector(obstacleSpeedSel);

  const handleGameOver = () => {
    dispatch(stopGame());
    navigation.navigate('GameOver');
    dispatch(restoreLives());
    dispatch(saveGameDataThunk());
  };

  useEffect(() => {
    if (lives === 0) handleGameOver();
  }, [lives]);

  if (params.controlNumber == 1 && backgroundImage != UnderWaterBackground) {
    setBackgroundImage(UnderWaterBackground);
  } else if (params.controlNumber == 3 && backgroundImage != Background) {
    setBackgroundImage(Background);
  }

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            top: 50,
          }}
        >
          Speed: {obstacleSpeed}
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
