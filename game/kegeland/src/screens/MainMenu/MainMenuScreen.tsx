import { Box, Heading, Text, Button } from 'native-base';
import React from 'react';
import { NavigationScreenProps } from '../navigation.types';
import { AntDesign } from '@expo/vector-icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { firstNameSel } from '../../../state-management/user/userSlice';
import { SafeAreaView } from 'react-native';
import { clearGame } from '../../../state-management/game/gameSlice';

const MainMenuScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const handleStartGamePressOne = () => {
    navigation.navigate('Game');
    dispatch(clearGame(1));
  };
  const handleStartGamePressMultiple = () => {
    navigation.navigate('Game');
    dispatch(clearGame(2));
  };
  const firstName = useAppSelector(firstNameSel);

  return (
    <SafeAreaView>
      <Box
        bg={{
          linearGradient: {
            colors: ['rose.200', 'pink.300'],
            start: [1, 1],
            end: [1, 0],
          },
        }}
        p={8}
        minHeight="100%"
        w="100%"
        mx="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="2xl" color="teal.500">
          Hello {firstName}
        </Heading>

        <Heading color="muted.500" size="md" my={2}>
          Get ready for your next exercise
        </Heading>

        <Text fontSize="lg" mt={5}>
          Play regularly to improve your pelvic muscles. The exercises will be
          adapted to your previous results to customize your exercise.
        </Text>
        <Text alignSelf="flex-start" fontSize="lg" mt={3}>
          Enjoy🎉
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          m={7}
          startIcon={<AntDesign name="play" size={20} color="white" />}
          onPress={handleStartGamePressOne}
        >
          Start exercise - 1 control
        </Button>

        <Button
          size="lg"
          colorScheme="teal"
          m={7}
          startIcon={<AntDesign name="play" size={20} color="white" />}
          onPress={handleStartGamePressMultiple}
        >
          Start exercise - 2 controls
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default MainMenuScreen;
