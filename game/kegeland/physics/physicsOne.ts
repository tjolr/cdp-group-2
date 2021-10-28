import Matter from 'matter-js';
import { getPipeSizePosBottom } from '../utils/random';
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from 'react-native-game-engine';

import { Dimensions } from 'react-native';
import { getPlayerDefaultPosition } from '../src/utils/Player.Utils';

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
    const pipeSizePos = getPipeSizePosBottom(
      entities.Obstacle.userGameSettings,
      windowWidth * 0.9
    );

    const currentWidth =
      entities.Obstacle.body.bounds.max.x - entities.Obstacle.body.bounds.min.x;

    const scaleX = pipeSizePos.pipe.size.width / currentWidth;
    Matter.Body.scale(entities.Obstacle.body, scaleX, 1);
    Matter.Body.setPosition(entities.Obstacle.body, pipeSizePos.pipe.pos);
  };

  const playerHit = () => {
    // Player bounce upwards, to simulate a bump/crash
    Matter.Body.setVelocity(entities.Player.body, {
      x: 0,
      y: -4,
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
  if (playerY >= getPlayerDefaultPosition(windowHeight)) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(entities['Player'].body, { x: 0, y: 0 });
  } else {
    engine.gravity.y = 0.3;
  }

  Matter.Body.translate(entities[`Obstacle`].body, {
    x: -entities.Obstacle.userGameSettings.obstacleSpeed,
    y: 0,
  });

  if (
    Matter.Bounds.overlaps(
      entities.Player.body.bounds,
      entities.Obstacle.body.bounds
    )
  ) {
    playerHit();
    moveObstacle();
    dispatch({ type: 'hit_obstacle' });
  }

  return entities;
};
export default PhysicsOne;
