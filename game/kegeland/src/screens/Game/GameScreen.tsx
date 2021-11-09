import { HStack, Text, View } from 'native-base';
import { ImageBackground, SafeAreaView } from 'react-native';
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
  sessionSel,
  saveGameDataThunk,
  obstacleSpeedSel,
  setShield,
} from '../../../state-management/game/gameSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { NavigationScreenProps } from '../navigation.types';
import Background from '../../../assets/hills.png';
import { savePoints } from '../../../state-management/session/sessionSlice';
import UnderWaterBackground from '../../../assets/underwater-background.png';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { GameMode } from '../../../state-management/game/gameMode';
import sensorData from '../../../Datasets/2021_07_16_14_35_38.json';
import { useRefState } from '../../hooks';
import { translateSensorData } from '../../../utils/translateSensorData';
import { ACTIONS } from '../../../utils/utilityConstants';
import { StyleSheet } from 'react-native';

const GameScreen = ({ route, navigation }: NavigationScreenProps) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const points = useAppSelector(pointsSel);
  const lives = useAppSelector(livesSel);
  const running = useAppSelector(runningSel);
  const controls = useAppSelector(controlsSel);
  const session = useAppSelector(sessionSel);
  const [backgroundImage, setBackgroundImage] = useState(Background);
  const obstacleSpeed = useAppSelector(obstacleSpeedSel);
  const [lineCounter, setLineCounter] = useRefState(0);
  const [maxDataLineNumber, setMaxDataLineNumber] = useState(sensorData.length);
  const engine = useRef(null);
  const [loop, setLoop] = useState<NodeJS.Timer>();

  const handleGameOver = () => {
    dispatch(stopGame());
    if (session) {
      dispatch(savePoints(points));
      navigation.navigate('SAM');
    } else {
      navigation.navigate('GameOver');
    }
    dispatch(restoreLives());
    dispatch(saveGameDataThunk());
  };
  useEffect(() => {
    if (params.gameMode === GameMode.SensorDataTestControl) {
      let interval = setInterval(() => handleSensorData(), 500);
      setLoop(interval);
    }
  }, []);

  const handleSensorData = () => {
    if (lineCounter.current + 6 > maxDataLineNumber) {
      if (loop) clearInterval(loop);
      setLineCounter(0);
      navigation.navigate('MainMenu');
      return;
    }
    const arrData = Object.values(sensorData[lineCounter.current]);
    const action = translateSensorData(arrData, GameMode.MultiControl);
    if (action === -ACTIONS.HIGH) {
      engine.current.dispatch('move-up-fast');
    } else if (action === -ACTIONS.MEDIUM) {
      engine.current.dispatch('move-up-medium');
    } else if (action === -ACTIONS.LOW) {
      engine.current.dispatch('move-up-low');
    }
    setLineCounter(lineCounter.current + 5);
  };

  useEffect(() => {
    if (lives === 0) handleGameOver();
  }, [lives]);

  if (
    params.gameMode === GameMode.OneControl &&
    backgroundImage != UnderWaterBackground
  ) {
    setBackgroundImage(UnderWaterBackground);
  } else if (
    params.gameMode === GameMode.MultiControl &&
    backgroundImage != Background
  ) {
    setBackgroundImage(Background);
  }

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <SafeAreaView style={{ zIndex: 100 }}>
        <HStack
          space={3}
          alignItems="center"
          justifyContent="space-between"
          mx={4}
          my={2}
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
      </SafeAreaView>
      <GameEngine
        ref={engine}
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
            case 'activate_shield':
              dispatch(setShield(true));
              break;
            case 'deactivate_shield':
              dispatch(setShield(false));
              break;
          }
        }}
      ></GameEngine>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  shieldIcon: {
    position: 'absolute',
    right: 35,
    bottom: 40,
  },
});

export default GameScreen;
