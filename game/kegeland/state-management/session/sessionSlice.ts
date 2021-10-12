import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import { AppQuestionnaire, Question } from '../../types/questionnaires';
import { RootState } from '../store';
import { SessionState } from './sessionSlice.types';

const initialState: SessionState = {
  sessionId: '',
  gamesNumber: 3,
  currentGame: 0,
  points: [],
  getQuestionsStatus: 'idle',
  SAMQuestionnaire: undefined,
};

export const getQuestionsDefaultThunk = createAsyncThunk(
  'session/getQuestionsDefaultThunk',
  async (name: string): Promise<AppQuestionnaire | undefined> => {
    const samQuestions = (await API.getQuestionnaire(name)).data();
    return samQuestions;
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
      state.points[state.currentGame - 2] = action.payload;
      console.log(state.points);
    },
    clearSession: (state) => {
      state.currentGame = 0;
      state.points = [];
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
        if (questions) {
          state.SAMQuestionnaire = questions;
        }
      })
      .addCase(getQuestionsDefaultThunk.rejected, (state) => {
        state.getQuestionsStatus = 'failed';
      });
  },
});

export const { setSessionId, incrementGame, savePoints, clearSession } =
  sessionSlice.actions;

export const gamesNumberSel = (state: RootState) => state.session.gamesNumber;
export const currentGameSel = (state: RootState) => state.session.currentGame;
export const getQuestionsStatusSel = (state: RootState) =>
  state.session.getQuestionsStatus;
export const SAMQuestionnaireSel = (state: RootState) =>
  state.session.SAMQuestionnaire?.questionsList;

export default sessionSlice.reducer;
