import { translateSensorData } from '../../../utils/translateSensorData';
import { GameMode } from '../../../state-management/game/gameMode';
import { ACTIONS } from '../../../utils/utilityConstants';

describe('Testing translation from sensor data to velocity', () => {
  it('Test velocity for one control game mode', () => {
    const testData = [754, 755, 754, 755, 754, 755, 754, 755, 37];
    expect(translateSensorData(testData, GameMode.OneControl)).toBe(
      -ACTIONS.MEDIUM
    );
  });
  it('Test break wall action', () => {
    const testData = [755, 755, 755, 755, 755, 755, 755, 756];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(
      ACTIONS.BREAK_WALL
    );
  });
  it('Test flying up action', () => {
    const testData = [759, 758, 759, 758, 750, 750, 750, 750];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(
      -ACTIONS.HIGH
    );
  });
  it('Test flying down action', () => {
    const testData = [750, 750, 750, 750, 758, 759, 758, 759];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(
      ACTIONS.HIGH
    );
  });
  it('Test flying down slowly', () => {
    const testData = [745, 745, 745, 745, 751, 751, 751, 751];
    expect(translateSensorData(testData, GameMode.MultiControl)).toBe(
      ACTIONS.LOW
    );
  });
  it('Test default case', () => {
    const testData = [740, 740, 740, 740, 740, 740, 740, 740];
    const actionValue = translateSensorData(testData, GameMode.MultiControl);
    expect(Math.abs(actionValue)).toBe(ACTIONS.DEFAULT);
  });
  it('Test default case', () => {
    const testData = [745, 745, 745, 745, 740, 740, 740, 740];
    const actionValue = translateSensorData(testData, GameMode.MultiControl);
    expect(Math.abs(actionValue)).toBe(ACTIONS.DEFAULT);
  });
});
