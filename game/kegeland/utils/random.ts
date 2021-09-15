import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface IRandom {
  min: number;
  max: number;
}

export const getRandom = (props: IRandom) => {
  return Math.floor(Math.random() * (props.max - props.min + 1) + props.min);
};
export const getPipeSizePos = (addToPosX = 0) => {
  let min = 300;
  let max = windowHeight - 100;
  let yPosTop = -getRandom({ min, max });
  let pipe;
  let yCoord;

  // Randomly decide if the pipe should be at the bottom or top
  const rndInt = Math.floor(Math.random() * 2) + 1;
  if (rndInt == 1) {
    yCoord = yPosTop;
  } else {
    yCoord = windowHeight * 2 + 200 + yPosTop;
  }
  pipe = {
    pos: { x: windowWidth + addToPosX, y: yCoord },
    size: { height: windowHeight * 2, width: 75 },
  };

  return { pipe };
};
