import { UserCredential } from '@firebase/auth-types';
export type AppQuestionnaire = {
  id?: string;
  questions: Array<Question>;
};

export type Question = {
  text: string;
  minVal: string;
  maxVal: string;
};
