import { PipeSizePos } from '../types/game';

export const scaleObstacleWidth = (
  entityBounds: { max: { x: number }; min: { x: number } },
  pipeSizePos: PipeSizePos
): number => {
  const currentWidth = entityBounds.max.x - entityBounds.min.x;

  const scaleX = pipeSizePos.pipe.size.width / currentWidth;
  return scaleX;
};

export const scaleObstacleHeight = (
  entityBounds: { max: { y: number }; min: { y: number } },
  pipeSizePos: PipeSizePos
): number => {
  const currentHeight = entityBounds.max.y - entityBounds.min.y;

  const scaleY = pipeSizePos.pipe.size.height / currentHeight;
  return scaleY;
};
