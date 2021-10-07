import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import { Question } from '../../types/questionnaires';
import { RootState } from '../store';
import { SessionState } from './sessionSlice.types';

const initialState: SessionState = {
  sessionId: '',
  gamesNumber: 3,
  currentGame: 0,
  points: [],
  getQuestionsDefaultThunk: 'idle',
};

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
  },
});

export const getQuestionsDefaultThunk = createAsyncThunk(
  'session/getQuestionsDefaultThunk',
  async (name: string): Promise<Array<Question>> => {
    const samQuestions = await (
      await API.getQuestionnaire(name)
    ).get('questions');
    return { ...samQuestions.questions };
  }
);

export const { setSessionId, incrementGame, savePoints } = sessionSlice.actions;

export const gamesNumberSel = (state: RootState) => state.session.gamesNumber;
export const currentGameSel = (state: RootState) => state.session.currentGame;
export const getQuestionsDefaultThunkSel = (state: RootState) =>
  state.session.getQuestionsDefaultThunk;

export default sessionSlice.reducer;
