import { Box, HStack, Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
      <Box style={{ zIndex: 100 }}>
        <HStack
          space={3}
          alignItems="center"
          justifyContent="space-between"
          m={4}
        >
          <HStack alignItems="center" space={1}>
            <Foundation
              name="trophy"
              size={30}
              color={theme.colors.yellow[600]}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: theme.colors.yellow[600],
              }}
              ml={1}
            >
              {points}
            </Text>
          </HStack>

          <HStack alignItems="center" space={1}>
            <Ionicons
              name="speedometer"
              size={30}
              color={theme.colors.darkBlue[700]}
            />

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: theme.colors.darkBlue[700],
              }}
              ml={1}
            >
              {obstacleSpeed}
            </Text>
          </HStack>

          <HStack
            alignItems="center"
            space={1}
            width={35}
            justifyContent="flex-end"
          >
            {Array(lives)
              .fill(0)
              .map((_, index: number) => (
                <AntDesign
                  key={index}
                  name="heart"
                  size={30}
                  color={theme.colors.red[500]}
                />
              ))}
          </HStack>
        </HStack>
      </Box>
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
