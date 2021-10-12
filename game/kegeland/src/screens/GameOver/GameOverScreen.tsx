import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';
import { Box, Text, Heading, Button } from 'native-base';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import {
  clearGame,
  getUserGameSettingsThunk,
  pointsSel,
} from '../../../state-management/game/gameSlice';
import { GameMode } from '../../../state-management/game/gameMode';

const GameOverScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const handleMainMenuPress = () => navigation.navigate('MainMenu');
  const handleNextGamePressOne = () => {
    navigation.navigate('Game', {
      controlNumber: 1,
    });
    restartGame(GameMode.OneControl);
  };
  const handleNextGamePressMultiple = () => {
    navigation.navigate('Game', {
      controlNumber: 3,
    });
    restartGame(GameMode.MultiControl);
  };
  const points = useAppSelector(pointsSel);

  const restartGame = (gameMode: GameMode) => {
    setTimeout(() => {
      dispatch(clearGame(gameMode));
      dispatch(getUserGameSettingsThunk());
    }, 100);
  };

  return (
    <Box
      alignItems="center"
      bg={{
        linearGradient: {
          colors: ['rose.300', 'pink.100'],
          start: [1, 0],
          end: [0, 1],
        },
      }}
      style={styles.container}
    >
      <Heading
        paddingBottom="50px"
        size="2xl"
        color="teal.500"
        alignSelf={{
          base: 'center',
          md: 'flex-start',
        }}
      >
        Game Over!
      </Heading>

      <Text fontSize="2xl" fontWeight="bold" marginBottom="10">
        This is your score:{' '}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {' '}
        {points}{' '}
      </Text>

      <Button
        onPress={handleNextGamePressOne}
        marginBottom="5"
        marginTop="20"
        colorScheme="teal"
        _text={{ color: 'white' }}
        style={styles.button}
      >
        PLAY NEXT GAME - 1 CONTROL
      </Button>
      <Button
        onPress={handleNextGamePressMultiple}
        marginBottom="10"
        colorScheme="teal"
        _text={{ color: 'white' }}
        style={styles.button}
      >
        PLAY NEXT GAME - 2 CONTROLS
      </Button>
      <Button
        onPress={handleMainMenuPress}
        colorScheme="teal"
        _text={{ color: 'white' }}
      >
        RETURN TO MAIN MENU
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
  },
});

export default GameOverScreen;
