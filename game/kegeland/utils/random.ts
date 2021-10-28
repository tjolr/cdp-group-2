import { Dimensions } from 'react-native';
import { UserGameSettings } from '../types/user';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePos = (addToPosX = 0) => {
  let min = 300;
  let max = windowHeight - 100;
  let yPosTop = -getRandom(min, max);
  let pipe;
  let yCoord;

  // Randomly decide if the pipe should be at the bottom, top or full height wall
  const rndInt = getRandom(1, 3);
  if (rndInt == 1) {
    yCoord = yPosTop;
  } else if (rndInt == 2) {
    yCoord = windowHeight * 2 + 200 + yPosTop;
  } else {
    yCoord = 0;
  }
  pipe = {
    pos: { x: windowWidth + addToPosX, y: yCoord },
    size: { height: windowHeight * 2, width: 75 },
  };

  return { pipe };
};

export const getPipeSizePosBottom = (
  userGameSettings: UserGameSettings,
  addToPosX = 0
) => {
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
