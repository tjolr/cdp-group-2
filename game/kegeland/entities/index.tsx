import { Engine } from 'matter-js';
import Player from '../components/Player';

export default () => {
  let engine = Engine.create();
  let world = engine.world;

  world.gravity.y = 0.3;

  return {
    physics: { engine, world },
    Player: Player({
      world,
      pos: { x: 50, y: 250 },
      size: { width: 50, height: 50 },
    }),
  };
};
