import { Engine } from 'matter-js';
import Player from '../components/Player';
import Bounds from '../components/Bounds';
import Obstacle from '../components/Obstacle';
import { Dimensions } from 'react-native';
import { getPipeSizePosBottom } from '../utils/random';
import { useAppSelector } from '../state-management/redux.hooks';
import { controlsSel } from '../state-management/game/gameSlice';
import PhysicsOne from '../physics/physicsOne';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Entities = () => {
  let engine = Engine.create();
  let world = engine.world;
  engine.gravity.y = 0;
  const controls = useAppSelector(controlsSel);
  let playerY = windowHeight / 2;
  if (controls == PhysicsOne) playerY = windowHeight - 250;

  const pipeSizePos = getPipeSizePosBottom();

  return {
    physics: { engine, world },
    Player: Player({
      world,
      pos: { x: 50, y: playerY },
      size: { width: 75, height: 50 },
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
    Obstacle: Obstacle({
      world,
      pos: pipeSizePos.pipe.pos,
      size: pipeSizePos.pipe.size,
    }),
  };
};

export default Entities;
