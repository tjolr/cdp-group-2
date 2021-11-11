import Matter from 'matter-js';
import { GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import { checkIfPoint } from './physics.shared';

import { GameMode } from '../state-management/game/gameMode';

const PhysicsSensorData = (
  entities: any,
  { events, time, dispatch }: GameEngineUpdateEventOptionType
) => {
  let engine = entities.physics.engine;

  Matter.Engine.update(engine, time.delta);

  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case 'move-up-fast':
          Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: -4,
          });
          break;
        case 'move-up-medium':
          Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: -3,
          });
          break;
        case 'move-up-low':
          Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: -2,
          });
          break;
      }
    });
  }
  engine.gravity.y = 0.3;

  checkIfPoint(entities, dispatch, GameMode.OneControl);

  if (
    entities['Obstacle'].body.bounds.max.x <= 10 &&
    !entities['Obstacle'].point
  ) {
    entities['Obstacle'].point = true;
    dispatch({ type: 'new_point' });
  }

  Matter.Body.translate(entities[`Obstacle`].body, {
    x: -3,
    y: 0,
  });

  return entities;
};
export default PhysicsSensorData;
