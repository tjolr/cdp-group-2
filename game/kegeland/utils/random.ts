import { Dimensions } from 'react-native';
import { PipeSizePos } from '../types/game';
import { UserGameSettings } from '../types/user';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePos = (
  userGameSettings: UserGameSettings,
  addToPosX = 0
): PipeSizePos => {
  const { min, max } = userGameSettings.height;

  // if min is lower than 0.5, which is the default y position
  // for multicontrol, raise the height
  // also adjust if too high
  const adjustedMin = Math.min(Math.max(min, 0.55), 0.8);
  const adjustedMax = Math.min(Math.max(max, 0.6), 0.85);

  const relativeMin = windowHeight * adjustedMin;
  const relativeMax = windowHeight * adjustedMax;

  const pipeHeight = 2 * getRandom(relativeMin, relativeMax);

  const obstacleWidth = getRandom(
    userGameSettings.width.min,
    userGameSettings.width.max
  );

  const rndInt = getRandom(1, 3);

  let yPosition = 0;
  let obstacleHeight = 0;
  switch (rndInt) {
    case 1:
      // top
      obstacleHeight = pipeHeight;
      yPosition = 0;
      break;
    case 2:
      // bottom
      obstacleHeight = pipeHeight;
      yPosition = windowHeight;
      break;
    case 3:
      // middle
      yPosition = windowHeight / 2;
      obstacleHeight = 2 * windowHeight;
      break;
  }

  const pipe = {
    pos: { x: windowWidth + addToPosX, y: yPosition },
    size: { height: obstacleHeight, width: obstacleWidth },
  };

  return { pipe };
};

export const getPipeSizePosBottom = (
  userGameSettings: UserGameSettings,
  addToPosX = 0
): PipeSizePos => {
  const { min, max } = userGameSettings.height;

  const relativeMin = windowHeight * min;
  const relativeMax = windowHeight * max;

  const yPosTop = -getRandom(relativeMin, relativeMax);

  const obstacleWidth = getRandom(
    userGameSettings.width.min,
    userGameSettings.width.max
  );

  const yCoord = windowHeight * 2 + yPosTop;

  const pipe = {
    pos: { x: windowWidth + addToPosX, y: yCoord },
    size: { height: windowHeight * 2, width: obstacleWidth },
  };

  return { pipe };
};
