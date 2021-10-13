import {
  Box,
  Heading,
  Text,
  Button,
  Slider,
  HStack,
  FormControl,
  Radio,
} from 'native-base';
import React, { useState } from 'react';
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
  saveSAManswers,
} from '../../../state-management/session/sessionSlice';
import { Question } from '../../../types/questionnaires';
import { GameMode } from '../../../state-management/game/gameMode';

const SAMScreen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();
  const currentGameNumber = useAppSelector(currentGameSel);
  const gamesNumber = useAppSelector(gamesNumberSel);
  const SAMquestions = useAppSelector(SAMQuestionnaireSel);
  const [formData, setformData] = useState<Array<number>>([]);
  const handleStartGamePress = async () => {
    console.log(formData);
    dispatch(saveSAManswers(formData));
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
    setformData([]);
  };

  function setSingleAnswer(nextValue: string, index: number, formData: any) {
    const insert = (formData: any, index: number, nextValue: number) => [
      // part of the array before the specified index
      ...formData.slice(0, index),
      // inserted item
      nextValue,
      // part of the array after the specified index
      ...formData.slice(index),
    ];

    setformData(insert(formData, index, parseInt(nextValue)));
  }

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

        <Heading color="muted.500" size="md" my={2} textAlign="center">
          Fill in this questionnaire before starting the session
        </Heading>

        {SAMquestions?.length &&
          SAMquestions.map((question: Question, index) => (
            <Box mx="auto" width="100%" borderColor="coolGray.600">
              <Text textAlign="center">{question.text}</Text>
              <FormControl isInvalid>
                <FormControl.Label
                  _text={{
                    fontSize: 'lg',
                    bold: true,
                  }}
                >
                  {question.text}
                  <HStack
                    space={3}
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Text textAlign="left">{question.MinVal}</Text>
                    <Text textAlign="right">{question.MaxVal}</Text>
                  </HStack>
                </FormControl.Label>
                <Radio.Group
                  style={{ flexDirection: 'row' }}
                  name={question.key + 'group'}
                  accessibilityLabel={question.key + 'value'}
                  onChange={(nextValue) => {
                    setSingleAnswer(nextValue, index, formData);
                  }}
                >
                  <Radio value="1" my="1" mr="2">
                    1
                  </Radio>
                  <Radio value="2" my="1" mr="2">
                    2
                  </Radio>
                  <Radio value="3" my="1" mr="2">
                    3
                  </Radio>
                  <Radio value="4" my="1" mr="2">
                    4
                  </Radio>
                  <Radio value="5" my="1" mr="2">
                    5
                  </Radio>
                  <Radio value="6" my="1" mr="2">
                    6
                  </Radio>
                </Radio.Group>
              </FormControl>
            </Box>
          ))}

        <Button
          size="lg"
          colorScheme="teal"
          marginTop="20"
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

/*  IF WE WANT TO ADD FORM CONTROL
<FormControl.ErrorMessage>
  You must select an option.
</FormControl.ErrorMessage>
*/
