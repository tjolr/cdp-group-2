import { ApiStatus } from '../../types/state-management';
import { UserGameSettings } from '../../types/user';

export interface GameState {
  gameId: string;
  points: number;
  lives: number;
  settings: UserGameSettings;
  obstacleSpeed: number;
  running: boolean;
  controls: any;
  session: boolean;
  saveGameDataStatus: ApiStatus;
  getUserGameSettingsStatus: ApiStatus;
}

export interface MinMax {
  min: number;
  max: number;
}
