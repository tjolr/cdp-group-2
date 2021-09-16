import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainMenu: undefined;
  Register: undefined;
  Game: undefined;
  GameOver: undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
