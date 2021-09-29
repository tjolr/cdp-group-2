import { Dimensions } from 'react-native';

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
