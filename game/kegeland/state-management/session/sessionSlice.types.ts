import { AppQuestionnaire } from '../../types/questionnaires';
import { ApiStatus } from '../../types/state-management';

export interface SessionState {
  sessionId: string;
  gamesNumber: number;
  currentGame: number;
  sessionPoints: Array<number>;
  getQuestionsStatus: ApiStatus;
  SAMQuestionnaire?: AppQuestionnaire;
  SAManswers?: Array<Array<number>>;
  SA1Questionnaire?: AppQuestionnaire;
  SA1answers?: Array<number>;
  SA2Questionnaire?: AppQuestionnaire;
  SA2answers?: Array<number>;
  saveSessionDataStatus: ApiStatus;
}

export interface sessionData {
  timestamp: number;
  gamesNumber: number;
  sessionPoints: Array<number>;
  SAManswers?: Array<Array<number>>;
  SA1answers?: Array<number>;
  SA2answers?: Array<number>;
}
