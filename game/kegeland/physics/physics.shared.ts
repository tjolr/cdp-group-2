import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { GameMode } from '../state-management/game/gameMode';
import { PipeSizePos } from '../types/game';
import {
  scaleObstacleHeight,
  scaleObstacleWidth,
} from '../utils/physics.utils';
import { getPipeSizePos, getPipeSizePosBottom } from '../utils/random';

const windowWidth = Dimensions.get('window').width;

export const moveObstacle = (entities: any, gameMode: GameMode) => {
  const pipeSizePos: PipeSizePos =
    gameMode === GameMode.OneControl
      ? getPipeSizePosBottom(
          entities.Obstacle.userGameSettings,
          windowWidth * 0.9
        )
      : getPipeSizePos(entities.Obstacle.userGameSettings, windowWidth * 0.9);

  const scaleX = scaleObstacleWidth(entities.Obstacle.body.bounds, pipeSizePos);
  const scaleY = scaleObstacleHeight(
    entities.Obstacle.body.bounds,
    pipeSizePos
  );
  Matter.Body.scale(entities.Obstacle.body, scaleX, scaleY);
  Matter.Body.setPosition(entities.Obstacle.body, pipeSizePos.pipe.pos);
};

export const hideObstacle = (entities: any) => {
  Matter.Body.setPosition(entities.Obstacle.body, { x: 0, y: 10000 });
};

export const checkIfPoint = (
  entities: any,
  dispatch: (event: any) => void,
  gameMode: GameMode
) => {
  if (
    entities['Obstacle'].body.bounds.max.x <= 10 &&
    !entities['Obstacle'].point
  ) {
    entities['Obstacle'].point = true;
    dispatch({ type: 'new_point' });
  }

  if (entities['Obstacle'].body.bounds.max.x <= 0) {
    entities['Obstacle'].point = false;
    moveObstacle(entities, gameMode);
  }
};

export const translateObstacle = (entities: any) => {
  Matter.Body.translate(entities[`Obstacle`].body, {
    x: -entities.Obstacle.userGameSettings.obstacleSpeed,
    y: 0,
  });
};
