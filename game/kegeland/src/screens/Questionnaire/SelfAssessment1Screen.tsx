import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  HStack,
  Radio,
  ScrollView,
} from 'native-base';
import React, { useState } from 'react';
import { NavigationScreenProps } from '../navigation.types';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../state-management/redux.hooks';
import { SafeAreaView } from 'react-native';
import {
  incrementGame,
  SA1QuestionnaireSel,
  saveSA1answers,
} from '../../../state-management/session/sessionSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import { scrollViewStyles } from '../../common/scrollView';
import { Question } from '../../../types/questionnaires';

const SelfAssessment1Screen = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useAppDispatch();

  const SA1questions = useAppSelector(SA1QuestionnaireSel);
  const [formData, setFormData] = useState<Array<number>>([]);

  const handleStartGamePress = () => {
    navigation.navigate('SAM');
    dispatch(incrementGame());
    dispatch(saveSA1answers(formData));
    setFormData([]);
  };

  function setSingleAnswer(
    nextValue: string,
    index: number,
    formData: number[]
  ) {
    const insert = (formData: number[], index: number, nextValue: number) => [
      // part of the array before the specified index
      ...formData.slice(0, index),
      // inserted item
      nextValue,
      // part of the array after the specified index
      ...formData.slice(index),
    ];

    setFormData(insert(formData, index, parseInt(nextValue)));
  }

  return (
    <Box style={scrollViewStyles.container}>
      <ScrollView style={scrollViewStyles.scrollView}>
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
            Self Assessment 1 Questionnaire
          </Heading>

          <Heading color="muted.500" size="md" my={2} textAlign="center">
            Fill in this questionnaire before starting the session
          </Heading>

          {SA1questions?.length &&
            SA1questions.map((question: Question, index) => (
              <Box
                mx="auto"
                width="100%"
                borderColor="coolGray.600"
                mt={8}
                key={question.key}
              >
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
            startIcon={
              <FontAwesome5 name="question-circle" size={24} color="white" />
            }
            onPress={handleStartGamePress}
          >
            SAM Questionnaire
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SelfAssessment1Screen;
