import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainMenu: undefined;
  Register: undefined;
  Game: { gameMode: string };
  GameOver: undefined;
  SelfAssessment1: undefined;
  SelfAssessment2: undefined;
  SAM: undefined;
  RegQuestionnaire: undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
