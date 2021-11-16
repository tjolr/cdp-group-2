import Matter from 'matter-js';
import {
  GameEngineUpdateEventOptionType,
  TouchEvent,
} from 'react-native-game-engine';
import { getPlayerDefaultYPosition } from '../src/utils/Player.Utils';
import {
  checkIfPoint,
  moveObstacle,
  translateObstacle,
} from './physics.shared';
import { GameMode } from '../state-management/game/gameMode';

const PhysicsOne = (
  entities: any,
  { events, touches, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;
  touches
    .filter((t: TouchEvent) => t.type === 'start')
    .forEach((_) => {
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

  const playerHit = () => {
    // Player bounce upwards, to simulate a bump/crash
    Matter.Body.setVelocity(entities.Player.body, {
      x: 0,
      y: -4,
    });
  };

  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case 'move-obstacle':
          moveObstacle(entities, GameMode.OneControl);
      }
    });
  }

  checkIfPoint(entities, dispatch, GameMode.OneControl);

  let playerY =
    (entities['Player'].body.bounds.min.y +
      entities['Player'].body.bounds.max.y) /
    2;
  if (playerY >= getPlayerDefaultYPosition(GameMode.OneControl)) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(entities['Player'].body, { x: 0, y: 0 });
  } else {
    engine.gravity.y = 0.3;
  }

  translateObstacle(entities);

  if (
    Matter.Bounds.overlaps(
      entities.Player.body.bounds,
      entities.Obstacle.body.bounds
    )
  ) {
    playerHit();
    moveObstacle(entities, GameMode.OneControl);
    dispatch({ type: 'hit_obstacle' });
  }

  return entities;
};
export default PhysicsOne;
