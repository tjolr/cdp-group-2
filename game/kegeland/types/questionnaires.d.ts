export type AppQuestionnaire = {
  id?: string;
  name: string;
  questionsList: Array<Question>;
};

export type Question = {
  text: string;
  minVal: string;
  maxVal: string;
  key: string;
};

export interface QuestionnaireAnswer {
  id: String;
  answers: Array<number>;
}
