import { UserGameSettings } from '../../../types/user';
import { getPipeSizePosBottom } from '../../../utils/random';

describe('Testing random utility functions', () => {
  it('Test the width of the obstacle', () => {
    const userGameSettings: UserGameSettings = {
      obstacleSpeed: 3,
      lives: 3,
      objects: 1,
      height: { min: 0.4, max: 0.5 },
      width: { min: 250, max: 400 },
    };

    const pipeSizePos = getPipeSizePosBottom(userGameSettings);

    expect(pipeSizePos.pipe.size.width).toBeGreaterThanOrEqual(
      userGameSettings.width.min
    );
    expect(pipeSizePos.pipe.size.width).toBeLessThanOrEqual(
      userGameSettings.width.max
    );
  });
});
