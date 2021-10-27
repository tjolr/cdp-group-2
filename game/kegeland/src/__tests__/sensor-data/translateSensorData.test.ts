import { translateSensorData } from '../../../utils/translateSensorData';
import { GameMode } from '../../../state-management/game/gameMode';

describe('Testing translation from sensor data to velocity', () => {
  it('Test the width of the obstacle', () => {
    const testData = [750, 752, 750, 754, 750, 756, 752, 751, 37];
    expect(translateSensorData(testData, GameMode.OneControl)).toBe(-3);
  });
  it('Test the width of the obstacle', () => {
    const testData = [752, 752, 752, 752, 752, 752, 752, 752, 37];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(1);
  });
});
