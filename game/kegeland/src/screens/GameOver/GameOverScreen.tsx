import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from '../navigation.types';
import { Box, Text, Heading, Button, Center } from 'native-base';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { clearGame, pointsSel } from '../../../state-management/game/gameSlice';

const GameOverScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const handleMainMenuPress = () => navigation.navigate('MainMenu');
  const handleNextGamePress = () => {
    navigation.navigate('Game');
    setTimeout(() => {
      dispatch(clearGame());
    }, 100);
  };
  const points = useAppSelector(pointsSel);

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
        paddingBottom="50"
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
        onPress={handleNextGamePress}
        marginBottom="10"
        marginTop="20"
        colorScheme="teal"
        _text={{ color: 'white' }}
      >
        PLAY NEXT GAME
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
});

export default GameOverScreen;
