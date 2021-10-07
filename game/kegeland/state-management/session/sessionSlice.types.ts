import { ApiStatus } from '../../types/state-management';

export interface SessionState {
  sessionId: string;
  gamesNumber: number;
  currentGame: number;
  points: Array<number>;
  getQuestionsDefaultThunk: ApiStatus;
}
