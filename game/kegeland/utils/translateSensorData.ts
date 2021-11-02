import { GameMode } from '../state-management/game/gameMode';
import { ACTIONS } from './utilityConstants';
import { THRESHOLD_VALUES } from './utilityConstants';

export const translateSensorData = (
  data: Array<number>,
  gameMode: GameMode
) => {
  const pressureData = data.slice(0, 8);
  return gameMode === GameMode.OneControl
    ? singleControlTranslation(pressureData)
    : multipleControlTranslation(pressureData);
};

const singleControlTranslation = (pressureData: Array<number>) => {
  const averagePressure =
    pressureData.reduce((a, b) => a + b) / pressureData.length;
  return -checkPressure(averagePressure);
};

const multipleControlTranslation = (pressureData: Array<number>) => {
  const THRESHOLD = 2;
  const upperSensors = pressureData.slice(0, 4);
  const lowerSensors = pressureData.slice(4, 8);
  const allSensors = pressureData.slice(0, 8);
  const averageTotal = allSensors.reduce((a, b) => a + b) / allSensors.length;
  const averageUpperPressure =
    upperSensors.reduce((a, b) => a + b) / upperSensors.length;
  const averageLowerPressure =
    lowerSensors.reduce((a, b) => a + b) / lowerSensors.length;
  if (averageUpperPressure - THRESHOLD > averageLowerPressure) {
    return -checkPressure(averageUpperPressure);
  } else if (averageLowerPressure - THRESHOLD > averageUpperPressure) {
    return checkPressure(averageLowerPressure);
  } else if (averageTotal > THRESHOLD_VALUES.MEDIUM) {
    return ACTIONS.BREAK_WALL;
  } else return ACTIONS.DEFAULT;
};

// Values should be based on calibration in the future
const checkPressure = (averagePressure: number) => {
  //console.log(averagePressure);
  if (averagePressure < THRESHOLD_VALUES.LOWER) return ACTIONS.DEFAULT;
  if (averagePressure < THRESHOLD_VALUES.MEDIUM) {
    return ACTIONS.LOW;
  } else if (
    averagePressure >= THRESHOLD_VALUES.MEDIUM &&
    averagePressure < THRESHOLD_VALUES.UPPER
  ) {
    return ACTIONS.MEDIUM;
  } else if (averagePressure >= THRESHOLD_VALUES.UPPER) {
    return ACTIONS.HIGH;
  } else return ACTIONS.DEFAULT;
};
