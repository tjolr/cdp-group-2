import { GameMode } from '../state-management/game/gameMode';

export enum Actions {
  HIGH = 4,
  MEDIUM = 3,
  LOW = 2,
  BREAK_WALL = 1,
  DEFAULT = 0,
}

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
  const treshold = 2;
  const upperSensors = pressureData.slice(0, 4);
  const lowerSensors = pressureData.slice(4, 8);
  const allSensors = pressureData.slice(0, 8);
  const averageTotal = allSensors.reduce((a, b) => a + b) / allSensors.length;
  const averageUpperPressure =
    upperSensors.reduce((a, b) => a + b) / upperSensors.length;
  const averageLowerPressure =
    lowerSensors.reduce((a, b) => a + b) / lowerSensors.length;
  if (averageUpperPressure - treshold > averageLowerPressure) {
    return -checkPressure(averageUpperPressure);
  } else if (averageLowerPressure - treshold > averageUpperPressure) {
    return checkPressure(averageLowerPressure);
  } else if (averageTotal > 750) {
    return Actions.BREAK_WALL;
  } else return Actions.DEFAULT;
};

// Values should be based on calibration in the future
const checkPressure = (averagePressure: number) => {
  if (averagePressure < 750) {
    return Actions.LOW;
  } else if (averagePressure >= 750 && averagePressure < 754) {
    return Actions.MEDIUM;
  } else if (averagePressure >= 754) {
    return Actions.HIGH;
  } else return Actions.DEFAULT;
};
