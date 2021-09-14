import { Engine } from 'matter-js';
import Player from '../components/Player';
import Bounds from '../components/Bounds';

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default () => {
  let engine = Engine.create();
  let world = engine.world;

  world.gravity.y = 0.3;
  console.log(windowHeight);

  return {
    physics: { engine, world },
    Player: Player({
      world,
      pos: { x: 50, y: 250 },
      size: { width: 50, height: 50 },
    }),
    Floor: Bounds({
      world,
      pos: { x: windowWidth / 2, y: windowHeight },
      size: { height: 10, width: windowWidth },
    }),
    Roof: Bounds({
      world,
      pos: { x: windowWidth / 2, y: 0 },
      size: { height: 10, width: windowWidth },
    }),
  };
};
