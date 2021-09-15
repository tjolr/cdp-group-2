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
  const rndInt = Math.floor(Math.random() * 2) + 1;
  let pipe;

  if (rndInt == 1) {
    pipe = {
      pos: { x: windowWidth + addToPosX, y: yPosTop },
      size: { height: windowHeight * 2, width: 75 },
    };
  } else {
    pipe = {
      pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop },
      size: { height: windowHeight * 2, width: 75 },
    };
  }

  return { pipe };
};
