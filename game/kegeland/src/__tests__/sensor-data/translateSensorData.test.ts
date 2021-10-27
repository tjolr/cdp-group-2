import { translateSensorData } from '../../../utils/translateSensorData';
import { GameMode } from '../../../state-management/game/gameMode';

describe('Testing translation from sensor data to velocity', () => {
  it('Test velocity for one control game mode', () => {
    const testData = [750, 752, 750, 754, 750, 756, 752, 751, 37];
    expect(translateSensorData(testData, GameMode.OneControl)).toBe(-3);
  });
  it('Test break wall action', () => {
    const testData = [752, 752, 751, 752, 752, 752, 752, 752];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(1);
  });
  it('Test flying up action', () => {
    const testData = [756, 755, 756, 755, 750, 750, 750, 750];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(-4);
  });
  it('Test flying down action', () => {
    const testData = [750, 750, 750, 750, 756, 755, 756, 755];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(4);
  });
  it('Test flying down slowly', () => {
    const testData = [745, 745, 745, 745, 749, 749, 749, 749];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(2);
  });
  it('Test default case', () => {
    const testData = [740, 740, 740, 740, 740, 740, 740, 740];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(0);
  });
});
