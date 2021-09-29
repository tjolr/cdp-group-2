import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GameState } from './gameSlice.types';

const initialState: GameState = {
  gameId: '',
  points: 0,
  lives: 3,
  running: true,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    incrementPoints: (state) => {
      state.points += 1;
    },
    clearGame: (state) => {
      state.points = 0;
      state.gameId = '';
      state.lives = 3;
      state.running = true;
    },
    decrementLives: (state) => {
      state.lives -= 1;
    },
    restoreLives: (state) => {
      state.lives = 3;
    },

    stopGame: (state) => {
      state.running = false;
    },
  },
});

export const {
  setGameId,
  incrementPoints,
  clearGame,
  decrementLives,
  restoreLives,
  stopGame,
} = gameSlice.actions;

export const pointsSel = (state: RootState) => state.game.points;
export const livesSel = (state: RootState) => state.game.lives;
export const runningSel = (state: RootState) => state.game.running;

export default gameSlice.reducer;
