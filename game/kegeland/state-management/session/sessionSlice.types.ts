import { AppQuestionnaire } from '../../types/questionnaires';
import { ApiStatus } from '../../types/state-management';

export interface SessionState {
  sessionId: string;
  gamesNumber: number;
  currentGame: number;
  points: Array<number>;
  getQuestionsStatus: ApiStatus;
  SAMQuestionnaire?: AppQuestionnaire;
}
