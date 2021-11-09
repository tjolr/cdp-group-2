import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import {
  AppQuestionnaire,
  Question,
  QuestionnaireAnswer,
} from '../../types/questionnaires';
import { RootState } from '../store';
import { userIdSel } from '../user/userSlice';
import { sessionData, SessionState } from './sessionSlice.types';

const initialState: SessionState = {
  sessionId: '',
  gamesNumber: 3,
  currentGame: 0,
  sessionPoints: [],
  getQuestionsStatus: 'idle',
  saveSessionDataStatus: 'idle',
  SAMQuestionnaire: undefined,
  SAManswers: [],
  SA1Questionnaire: undefined,
  SA1answers: [],
  SA2Questionnaire: undefined,
  SA2answers: [],
};

export const getQuestionsDefaultThunk = createAsyncThunk(
  'session/getQuestionsDefaultThunk',
  async (name: string): Promise<AppQuestionnaire | undefined> => {
    const Questions = (await API.getQuestionnaire(name)).data();
    return Questions;
  }
);

export const saveSessionDataThunk = createAsyncThunk(
  'session/saveSessionDataThunk',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const userId = userIdSel(rootState);
    const sessionData: sessionData = {
      gamesNumber: gamesNumberSel(rootState),
      sessionPoints: sessionPointsSel(rootState),
      timestamp: new Date().valueOf(),
      SAManswers: SAMAnswersSel(rootState),
      SA1answers: SA1AnswersSel(rootState),
      SA2answers: SA2AnswersSel(rootState),
    };
    return await API.saveSessionData(sessionData, userId);
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    incrementGame: (state) => {
      state.currentGame += 1;
    },
    savePoints: (state, action: PayloadAction<number>) => {
      state.sessionPoints[state.currentGame - 2] = action.payload;
    },
    saveSAManswers: (state, action: PayloadAction<Array<number>>) => {
      const answers: QuestionnaireAnswer = {
        id: 'SAM' + state.currentGame,
        answers: action.payload,
      };
      state.SAManswers?.push(answers);
    },
    saveSA1answers: (state, action: PayloadAction<Array<number>>) => {
      state.SA1answers = action.payload;
    },
    saveSA2answers: (state, action: PayloadAction<Array<number>>) => {
      state.SA2answers = action.payload;
    },
    clearSession: (state) => {
      state.currentGame = 0;
      state.sessionPoints = [];
      state.SAManswers = [];
      state.SA1answers = [];
      state.SA2answers = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsDefaultThunk.pending, (state) => {
        state.getQuestionsStatus = 'loading';
      })
      .addCase(getQuestionsDefaultThunk.fulfilled, (state, action) => {
        state.getQuestionsStatus = 'idle';
        const questions = action.payload;
        switch (questions?.name) {
          case 'SAM':
            state.SAMQuestionnaire = questions;
            break;
          case 'SelfAssessment1':
            state.SA1Questionnaire = questions;
            break;
          case 'SelfAssessment2':
            state.SA2Questionnaire = questions;
            break;
        }
      })
      .addCase(getQuestionsDefaultThunk.rejected, (state) => {
        state.getQuestionsStatus = 'failed';
      })
      .addCase(saveSessionDataThunk.pending, (state) => {
        state.saveSessionDataStatus = 'loading';
      })
      .addCase(saveSessionDataThunk.fulfilled, (state) => {
        state.saveSessionDataStatus = 'idle';
      })
      .addCase(saveSessionDataThunk.rejected, (state) => {
        state.saveSessionDataStatus = 'failed';
      });
  },
});

export const {
  setSessionId,
  incrementGame,
  savePoints,
  clearSession,
  saveSAManswers,
  saveSA1answers,
  saveSA2answers,
} = sessionSlice.actions;

export const gamesNumberSel = (state: RootState) => state.session.gamesNumber;
export const currentGameSel = (state: RootState) => state.session.currentGame;
export const sessionPointsSel = (state: RootState) =>
  state.session.sessionPoints;
export const getQuestionsStatusSel = (state: RootState) =>
  state.session.getQuestionsStatus;
export const SAMQuestionnaireSel = (state: RootState) =>
  state.session.SAMQuestionnaire?.questionsList;
export const SA1QuestionnaireSel = (state: RootState) =>
  state.session.SA1Questionnaire?.questionsList;
export const SA2QuestionnaireSel = (state: RootState) =>
  state.session.SA2Questionnaire?.questionsList;
export const SA1AnswersSel = (state: RootState) => state.session.SA1answers;
export const SA2AnswersSel = (state: RootState) => state.session.SA2answers;
export const SAMAnswersSel = (state: RootState) => state.session.SAManswers;

export default sessionSlice.reducer;
