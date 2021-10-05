import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Physics1 from '../../physics/physics1control';
import Physics2 from '../../physics/physics2controls';
import { RootState } from '../store';
import { GameState } from './gameSlice.types';

const initialState: GameState = {
  gameId: '',
  points: 0,
  lives: 3,
  running: true,
  controls: Physics1,
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
    clearGame: (state, action: PayloadAction<number>) => {
      state.points = 0;
      state.gameId = '';
      state.lives = 3;
      state.running = true;
      switch (action.payload) {
        case 1:
          state.controls = Physics1;
          break;
        case 2:
          state.controls = Physics2;
          break;
      }
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
export const controlsSel = (state: RootState) => state.game.controls;

export default gameSlice.reducer;
