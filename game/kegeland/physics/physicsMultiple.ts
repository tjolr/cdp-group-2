import Matter from 'matter-js';
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from 'react-native-game-engine';

import { Dimensions } from 'react-native';
import {
  checkIfPoint,
  hideObstacle,
  translateObstacle,
} from './physics.shared';
import {
  getPlayerDefaultYPosition,
  MULTI_CONTROL_BUFFER,
} from '../src/utils/Player.Utils';
import { GameMode } from '../state-management/game/gameMode';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PhysicsMultiple = (
  entities: any,
  { touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  touches
    .filter((t: TouchEvent) => t.type === 'start')
    .forEach((t: TouchEvent) => {
      if (t.event.pageX > windowWidth / 2) {
        entities.Player.shield = true;
      } else if (t.event.pageY < windowHeight / 2) {
        entities.Player.speed = -4;
      } else {
        entities.Player.speed = 4;
      }
    });
  touches
    .filter((t: TouchEvent) => t.type === 'end')
    .forEach((t: TouchEvent) => {
      entities.Player.shield = false;
      entities.Player.speed = 0;
    });
  if (entities.Player.speed < 0 || entities.Player.speed > 0) {
    Matter.Body.setVelocity(entities.Player.body, {
      x: 0,
      y: entities.Player.speed,
    });
  }

  Matter.Engine.update(engine, time.delta);

  checkIfPoint(entities, dispatch, GameMode.MultiControl);

  let playerY =
    (entities['Player'].body.bounds.max.y +
      entities['Player'].body.bounds.min.y) /
    2;
  if (
    playerY >
      getPlayerDefaultYPosition(GameMode.MultiControl) - MULTI_CONTROL_BUFFER &&
    playerY <
      getPlayerDefaultYPosition(GameMode.MultiControl) + MULTI_CONTROL_BUFFER
  ) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(entities['Player'].body, { x: 0, y: 0 });
  } else if (playerY < windowHeight / 2) {
    engine.gravity.y = 0.3;
  } else {
    engine.gravity.y = -0.3;
  }

  translateObstacle(entities);

  if (
    Matter.Bounds.overlaps(
      entities.Player.body.bounds,
      entities.Obstacle.body.bounds
    )
  ) {
    // If the player has shield and the obstacle is a wall, then the player should not lose a life
    const obstacleBounds = entities['Obstacle'].body.bounds;
    const obstacleHeight = obstacleBounds.max.y - obstacleBounds.min.y;
    if (entities.Player.shield && obstacleHeight >= windowHeight)
      return entities;

    hideObstacle(entities);
    dispatch({ type: 'hit_obstacle' });
  }

  return entities;
};
export default PhysicsMultiple;
