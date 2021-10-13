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
import {
  clearGame,
  setSession,
  getUserGameSettingsThunk,
} from '../../../state-management/game/gameSlice';
import { getQuestionsDefaultThunk } from '../../../state-management/session/sessionSlice';
import { scrollViewStyles } from '../../common/scrollView';
import { StyleSheet } from 'react-native';
import { GameMode } from '../../../state-management/game/gameMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainMenuScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const handleStartGamePressOne = async () => {
    await dispatch(getUserGameSettingsThunk());
    navigation.navigate('Game', {
      controlNumber: 1,
    });
    dispatch(clearGame(GameMode.OneControl));
  };
  const handleStartGamePressMultiple = async () => {
    await dispatch(getUserGameSettingsThunk());
    navigation.navigate('Game', {
      controlNumber: 3,
    });
    dispatch(clearGame(GameMode.MultiControl));
  };
  const handleStartGameSession = () => {
    navigation.navigate('SelfAssessment1');
    dispatch(setSession(true));
    dispatch(getQuestionsDefaultThunk('SAM')).unwrap();
  };
  const firstName = useAppSelector(firstNameSel);

  return (
    <Box style={scrollViewStyles.container}>
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

        <Text fontSize="lg" my={7}>
          Play regularly to improve your pelvic muscles. The exercises will be
          adapted to your previous results to customize your exercise.
        </Text>

        <Text fontSize="lg" fontWeight="bold">
          Play a single game:
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          mt={5}
          startIcon={<AntDesign name="play" size={24} color="white" />}
          onPress={handleStartGamePressOne}
          style={styles.button}
        >
          One Control Game
        </Button>

        <Button
          size="lg"
          colorScheme="teal"
          mt={5}
          startIcon={<AntDesign name="play" size={24} color="white" />}
          onPress={handleStartGamePressMultiple}
          style={styles.button}
        >
          Multiple Control Game
        </Button>

        <Text fontSize="lg" mt={10} fontWeight="bold">
          Play a session:
        </Text>
        <Button
          size="lg"
          colorScheme="teal"
          m={5}
          startIcon={
            <MaterialCommunityIcons
              name="weight-lifter"
              size={24}
              color="white"
            />
          }
          style={styles.button}
          onPress={handleStartGameSession}
        >
          Start session
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
  },
});

export default MainMenuScreen;
