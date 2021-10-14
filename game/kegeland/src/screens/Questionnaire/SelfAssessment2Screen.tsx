import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  HStack,
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
  clearSession,
  SA2QuestionnaireSel,
  saveSA2answers,
  saveSessionDataThunk,
} from '../../../state-management/session/sessionSlice';
import { Question } from '../../../types/questionnaires';

const SelfAssessment2Screen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();

  const SA2questions = useAppSelector(SA2QuestionnaireSel);
  const [formData, setformData] = useState<Array<number>>([]);

  const handleEndSessionPress = () => {
    navigation.navigate('MainMenu');
    dispatch(saveSessionDataThunk());
    dispatch(clearSession());
    dispatch(saveSA2answers(formData));
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
        <Heading size="2xl" color="teal.500" textAlign="center">
          Self Assessment 2 Questionnaire
        </Heading>

        <Heading color="muted.500" size="md" my={2} textAlign="center">
          Fill in this questionnaire before ending the session
        </Heading>

        {SA2questions?.length &&
          SA2questions.map((question: Question, index) => (
            <Box mx="auto" width="100%" borderColor="coolGray.600" mt={8}>
              <Text textAlign="center" fontWeight="bold">
                {question.text}
              </Text>
              <FormControl isInvalid>
                <FormControl.Label
                  _text={{
                    fontSize: 'lg',
                    bold: true,
                  }}
                >
                  <HStack
                    space={3}
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Text textAlign="left">{question.minVal}</Text>
                    <Text textAlign="right">{question.maxVal}</Text>
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
          marginTop="10"
          startIcon={<AntDesign name="checkcircleo" size={24} color="white" />}
          onPress={handleEndSessionPress}
        >
          End Session
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default SelfAssessment2Screen;
