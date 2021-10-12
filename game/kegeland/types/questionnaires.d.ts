export type AppQuestionnaire = {
  id?: string;
  questionsList: Array<Question>;
};

export type Question = {
  text: string;
  minVal: string;
  maxVal: string;
  key: string;
};
