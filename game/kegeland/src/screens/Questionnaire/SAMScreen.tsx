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
} from '../../../state-management/game/gameSlice';
import {
  currentGameSel,
  gamesNumberSel,
  incrementGame,
} from '../../../state-management/session/sessionSlice';

const SAMScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const currentGameNumber = useAppSelector(currentGameSel);
  const gamesNumber = useAppSelector(gamesNumberSel);

  const handleStartGamePress = () => {
    dispatch(incrementGame());
    console.log(currentGameNumber);
    if (currentGameNumber <= gamesNumber) {
      navigation.navigate('Game');
      if (currentGameNumber % 2 == 1) {
        dispatch(clearGame(1));
      } else {
        dispatch(clearGame(2));
      }
    } else {
      navigation.navigate('SelfAssessment2');
      dispatch(setSession(false));
    }
  };

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
        <Heading size="2xl" color="teal.500" alignItems="center">
          SAM Questionnaire
        </Heading>

        <Heading color="muted.500" size="md" my={2} alignItems="center">
          Fill in this questionnaire before starting the session
        </Heading>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            top: 50,
            marginBottom: 100,
          }}
        >
          ...SAM Questions ....
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          marginTop="10"
          startIcon={<AntDesign name="play" size={20} color="white" />}
          onPress={handleStartGamePress}
        >
          Go!
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default SAMScreen;
