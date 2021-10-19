import { AppQuestionnaire } from '../../types/questionnaires';
import { ApiStatus } from '../../types/state-management';

export interface SessionState {
  sessionId: string;
  gamesNumber: number;
  currentGame: number;
  sessionPoints: Array<number>;
  getQuestionsStatus: ApiStatus;
  SAMQuestionnaire?: AppQuestionnaire;
  SAManswers?: Array<QuestionnaireAnswer>;
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
  SAManswers?: Array<QuestionnaireAnswer>;
  SA1answers?: Array<number>;
  SA2answers?: Array<number>;
}

export interface QuestionnaireAnswer {
  id: String;
  answers: Array<number>;
}
