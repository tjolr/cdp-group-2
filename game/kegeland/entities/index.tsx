import { Engine } from 'matter-js';
import Player from '../components/Player';
import Bounds from '../components/Bounds';
import Obstacle from '../components/Obstacle';
import { Dimensions } from 'react-native';
import { getPipeSizePos, getPipeSizePosBottom } from '../utils/random';
import { useAppSelector } from '../state-management/redux.hooks';
import {
  controlsSel,
  userGameSettingsSel,
} from '../state-management/game/gameSlice';
import PhysicsOne from '../physics/physicsOne';
import PhysicsSensorData from '../physics/physicsSensorData';
import { getPlayerDefaultYPosition } from '../src/utils/Player.Utils';
import { GameMode } from '../state-management/game/gameMode';
import { PipeSizePos } from '../types/game';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Entities = () => {
  let engine = Engine.create();
  let world = engine.world;
  engine.gravity.y = 0;
  const controls = useAppSelector(controlsSel);
  const userGameSettings = useAppSelector(userGameSettingsSel);

  let pipeSizePos: PipeSizePos = {
    pipe: {
      pos: {
        x: 0,
        y: 0,
      },
      size: {
        height: windowHeight / 2,
        width: 300,
      },
    },
  };

  let playerY = windowHeight / 2;
  if (controls == PhysicsOne) {
    playerY = getPlayerDefaultYPosition(GameMode.OneControl);
    pipeSizePos = getPipeSizePosBottom(userGameSettings);
    pipeSizePos.pipe.pos.x = pipeSizePos.pipe.pos.x + 1.2 * windowWidth;
  } else if (controls == PhysicsSensorData) {
    playerY = windowHeight;
  } else {
    playerY = getPlayerDefaultYPosition(GameMode.MultiControl);
    pipeSizePos = getPipeSizePos(userGameSettings);
    pipeSizePos.pipe.pos.x = pipeSizePos.pipe.pos.x + 1.2 * windowWidth;
  }

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
