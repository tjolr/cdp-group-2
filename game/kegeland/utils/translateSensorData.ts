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
  const averagePressure =
    pressureData.reduce((a, b) => a + b) / pressureData.length;
  return gameMode === GameMode.OneControl
    ? singleControlTranslation(averagePressure)
    : multipleControlTranslation(pressureData);
};

const singleControlTranslation = (averagePressure: number) => {
  return -checkPressure(averagePressure);
};

const multipleControlTranslation = (pressureData: Array<number>) => {
  const treshold = 1;
  const upperSensors = pressureData.slice(0, 4);
  const lowerSensors = pressureData.slice(4, 8);
  const allSensors = pressureData.slice(0, 8);
  const averageUpperPressure =
    upperSensors.reduce((a, b) => a + b) / upperSensors.length;
  const averageLowerPressure =
    lowerSensors.reduce((a, b) => a + b) / lowerSensors.length;
  if (averageUpperPressure - treshold > averageLowerPressure) {
    return -checkPressure(averageUpperPressure);
  } else if (averageLowerPressure - treshold > averageUpperPressure) {
    return checkPressure(averageUpperPressure);
  } else {
    return Actions.BREAK_WALL;
  }
};

const checkPressure = (averagePressure: number) => {
  if (averagePressure < 750) {
    return Actions.LOW;
  } else if (averagePressure >= 750 && averagePressure < 754) {
    return Actions.MEDIUM;
  } else if (averagePressure >= 754) {
    return Actions.HIGH;
  } else return Actions.DEFAULT;
};
