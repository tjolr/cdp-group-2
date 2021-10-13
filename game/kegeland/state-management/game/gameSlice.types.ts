import { ApiStatus } from '../../types/state-management';

export interface GameState {
  gameId: string;
  points: number;
  lives: number;
  obstacleSpeed: number;
  running: boolean;
  controls: any;
  session: boolean;
  saveGameDataStatus: ApiStatus;
  getUserGameSettingsStatus: ApiStatus;
}
