export type AppQuestionnaire = {
  id?: string;
  questionsList: Array<Question>;
};

export type Question = {
  text: string;
  MinVal: string;
  MaxVal: string;
  key: string;
};
