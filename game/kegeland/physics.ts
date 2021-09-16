import Matter from 'matter-js';
import { getPipeSizePos } from './utils/random';
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from 'react-native-game-engine';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Physics = (
  entities: any,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  let yVelocity: number;
  touches
    .filter((t: TouchEvent) => t.type === 'press')
    .forEach((t: TouchEvent) => {
      yVelocity = t.event.pageY < windowHeight / 2 ? -4 : 4;
      Matter.Body.setVelocity(entities.Player.body, {
        x: 0,
        y: yVelocity,
      });
    });

  Matter.Engine.update(engine, time.delta);

  const moveObstacle = () => {
    const pipeSizePos = getPipeSizePos(windowWidth * 0.9);
    Matter.Body.setPosition(entities['Obstacle'].body, pipeSizePos.pipe.pos);
  };

  if (entities['Obstacle'].body.bounds.max.x <= 0) {
    moveObstacle();
  }

  let playerY =
    (entities['Player'].body.bounds.max.y +
      entities['Player'].body.bounds.min.y) /
    2;
  if (playerY > windowHeight / 2 - 3 && playerY < windowHeight / 2 + 3) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(entities['Player'].body, { x: 0, y: 0 });
  } else if (playerY < windowHeight / 2) {
    engine.gravity.y = 0.3;
  } else {
    engine.gravity.y = -0.3;
  }

  Matter.Body.translate(entities[`Obstacle`].body, { x: -3, y: 0 });

  if (
    Matter.Bounds.overlaps(
      entities.Player.body.bounds,
      entities.Obstacle.body.bounds
    )
  ) {
    moveObstacle();
    dispatch({ type: 'hit_obstacle' });
  }

  return entities;
};
export default Physics;
