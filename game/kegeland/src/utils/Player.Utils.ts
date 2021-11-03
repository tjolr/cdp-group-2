import { Dimensions } from 'react-native';
import { GameMode } from '../../state-management/game/gameMode';

const windowHeight = Dimensions.get('window').height;

export const MULTI_CONTROL_BUFFER = 3;

export const getPlayerDefaultYPosition = (gameMode: GameMode): number => {
  switch (gameMode) {
    case GameMode.OneControl:
      return windowHeight * 0.75;
    case GameMode.MultiControl:
      return windowHeight * 0.5;
    default:
      return windowHeight * 0.5;
  }
};
