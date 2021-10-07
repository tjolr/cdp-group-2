import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SessionState } from './sesssionSlice.types';

const initialState: SessionState = {
  sessionId: '',
  gamesNumber: 3,
  currentGame: 0,
  points: [],
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

export const { setSessionId, incrementGame, savePoints } = sessionSlice.actions;

export const gamesNumberSel = (state: RootState) => state.session.gamesNumber;
export const currentGameSel = (state: RootState) => state.session.currentGame;

export default sessionSlice.reducer;
