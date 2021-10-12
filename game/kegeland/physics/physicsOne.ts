import Matter from 'matter-js';
import { getPipeSizePosBottom } from '../utils/random';
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from 'react-native-game-engine';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PhysicsOne = (
  entities: any,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  touches
    .filter((t: TouchEvent) => t.type === 'start')
    .forEach((t: TouchEvent) => {
      entities.Player.speed = -4;
    });
  touches
    .filter((t: TouchEvent) => t.type === 'end')
    .forEach((t: TouchEvent) => {
      entities.Player.speed = 0;
    });
  if (entities.Player.speed < 0) {
    Matter.Body.setVelocity(entities.Player.body, {
      x: 0,
      y: entities.Player.speed,
    });
  }

  Matter.Engine.update(engine, time.delta);

  const moveObstacle = () => {
    const pipeSizePos = getPipeSizePosBottom(windowWidth * 0.9);
    Matter.Body.setPosition(entities['Obstacle'].body, pipeSizePos.pipe.pos);
  };

  const movePlayer = () => {
    Matter.Body.setPosition(entities['Player'].body, {
      x: 50,
      y: windowHeight - 250,
    });
    Matter.Body.setVelocity(entities.Player.body, {
      x: 0,
      y: entities.Player.speed,
    });
  };

  if (
    entities['Obstacle'].body.bounds.max.x <= 10 &&
    !entities['Obstacle'].point
  ) {
    entities['Obstacle'].point = true;
    dispatch({ type: 'new_point' });
  }

  if (entities['Obstacle'].body.bounds.max.x <= 0) {
    entities['Obstacle'].point = false;
    moveObstacle();
  }

  let playerY =
    (entities['Player'].body.bounds.min.y +
      entities['Player'].body.bounds.max.y) /
    2;
  if (playerY >= windowHeight - 250) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(entities['Player'].body, { x: 0, y: 0 });
  } else {
    engine.gravity.y = 0.3;
  }

  Matter.Body.translate(entities[`Obstacle`].body, {
    x: -entities.Obstacle.speed,
    y: 0,
  });

  if (
    Matter.Bounds.overlaps(
      entities.Player.body.bounds,
      entities.Obstacle.body.bounds
    )
  ) {
    movePlayer();
    moveObstacle();
    dispatch({ type: 'hit_obstacle' });
  }

  return entities;
};
export default PhysicsOne;
