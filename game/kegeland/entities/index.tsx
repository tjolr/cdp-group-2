import { Engine } from 'matter-js';
import Player from '../components/Player';
import Bounds from '../components/Bounds';
import Obstacle from '../components/Obstacle';
import { Dimensions } from 'react-native';
import { getPipeSizePosBottom } from '../utils/random';
import { useAppSelector } from '../state-management/redux.hooks';
import {
  controlsSel,
  userGameSettingsSel,
} from '../state-management/game/gameSlice';
import PhysicsOne from '../physics/physicsOne';
import { getPlayerDefaultPosition } from '../src/utils/Player.Utils';
import PhysicsSensorData from '../physics/physicsSensorData';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Entities = () => {
  let engine = Engine.create();
  let world = engine.world;
  engine.gravity.y = 0;
  const controls = useAppSelector(controlsSel);
  const userGameSettings = useAppSelector(userGameSettingsSel);
  let playerY = windowHeight / 2;
  if (controls == PhysicsOne) {
    playerY = getPlayerDefaultPosition(windowHeight);
  } else if (controls == PhysicsSensorData) {
    playerY = windowHeight;
  }

  const pipeSizePos = getPipeSizePosBottom(userGameSettings);
  pipeSizePos.pipe.pos.x = pipeSizePos.pipe.pos.x + 1.2 * windowWidth;
  return {
    physics: { engine, world },
    Player: Player({
      world,
      pos: { x: 50, y: playerY },
      size: { width: 75, height: 50 },
      speed: 0,
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
      userGameSettings,
    }),
  };
};

export default Entities;
