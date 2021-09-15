import Matter from 'matter-js';
import { getPipeSizePos } from './utils/random';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Physics = (entities: any, { touches, time }: any) => {
  let engine = entities.physics.engine;
  touches
    .filter((t: any) => t.type === 'press')
    .forEach((t: any) => {
      Matter.Body.setVelocity(entities.Player.body, {
        x: 0,
        y: -4,
      });
    });

  Matter.Engine.update(engine, time.delta);

  if (entities['Obstacle'].body.bounds.max.x <= 0) {
    const pipeSizePos = getPipeSizePos(windowWidth * 0.9);

    Matter.Body.setPosition(entities['Obstacle'].body, pipeSizePos.pipe.pos);
  }

  Matter.Body.translate(entities[`Obstacle`].body, { x: -3, y: 0 });

  return entities;
};
export default Physics;
