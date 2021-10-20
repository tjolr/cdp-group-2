import {
  AppQuestionnaire,
  QuestionnaireAnswer,
} from '../../types/questionnaires';
import { ApiStatus } from '../../types/state-management';

export interface RegistrationQuestionnaire {
  id: string;
  getQuestionsStatus: ApiStatus;
  saveQuestionnaireStatus: ApiStatus;
  questions?: AppQuestionnaire;
  answers: Array<QuestionnaireAnswer>;
}
