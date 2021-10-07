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
import {
  currentGameSel,
  gamesNumberSel,
  incrementGame,
} from '../../../state-management/session/sessionSlice';

const SelfAssessment2Screen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const handleEndSessionPress = () => {
    navigation.navigate('MainMenu');
  };
  const gameNumber = useAppSelector(currentGameSel);

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
          Self Assessment 2 Questionnaire
        </Heading>

        <Heading color="muted.500" size="md" my={2} alignItems="center">
          Fill in this questionnaire before ending the session
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
          ... Questions ....
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          marginTop="10"
          startIcon={<AntDesign name="play" size={20} color="white" />}
          onPress={handleEndSessionPress}
        >
          End Session
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default SelfAssessment2Screen;
