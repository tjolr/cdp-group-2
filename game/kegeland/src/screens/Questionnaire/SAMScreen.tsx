import { Box, Heading, Text, Button, Slider, HStack } from 'native-base';
import React from 'react';
import { NavigationScreenProps } from '../navigation.types';
import { AntDesign } from '@expo/vector-icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { SafeAreaView } from 'react-native';
import {
  clearGame,
  getUserGameSettingsThunk,
  setSession,
} from '../../../state-management/game/gameSlice';
import {
  currentGameSel,
  gamesNumberSel,
  incrementGame,
  SAMQuestionnaireSel,
} from '../../../state-management/session/sessionSlice';
import { Question } from '../../../types/questionnaires';
import { GameMode } from '../../../state-management/game/gameMode';

const SAMScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const currentGameNumber = useAppSelector(currentGameSel);
  const gamesNumber = useAppSelector(gamesNumberSel);
  const SAMquestions = useAppSelector(SAMQuestionnaireSel);
  const handleStartGamePress = async () => {
    dispatch(incrementGame());
    if (currentGameNumber <= gamesNumber) {
      await dispatch(getUserGameSettingsThunk());
      if (currentGameNumber % 2 == 1) {
        navigation.navigate('Game', {
          controlNumber: 1,
        });
        dispatch(clearGame(GameMode.OneControl));
      } else {
        navigation.navigate('Game', {
          controlNumber: 3,
        });
        dispatch(clearGame(GameMode.MultiControl));
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

        {/*SAMquestions?.length &&
          SAMquestions.map((question: Question) => (
            <Box mx="auto" width="90%">
              <Text textAlign="center">{question.text}</Text>
              <HStack space={3} alignItems="center">
                <Text textAlign="left">{question.minVal}</Text>
                <Text textAlign="right">{question.maxVal}</Text>
              </HStack>
              <Slider>
                defaultValue={0}
                minValue={0}
                maxValue={10}
                accessibilityLabel="{question}" step={1}
              </Slider>
            </Box>
          ))*/}

        <Button
          size="lg"
          colorScheme="teal"
          marginTop="10"
          startIcon={<AntDesign name="play" size={24} color="white" />}
          onPress={handleStartGamePress}
        >
          Go!
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default SAMScreen;
