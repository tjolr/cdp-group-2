import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PhysicsOne from '../../physics/physicsOne';
import PhysicsMultiple from '../../physics/physicsMultiple';
import { RootState } from '../store';
import { GameState } from './gameSlice.types';

const initialState: GameState = {
  gameId: '',
  points: 0,
  lives: 3,
  running: true,
  controls: PhysicsOne,
  session: false,
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
          state.controls = PhysicsOne;
          break;
        case 2:
          state.controls = PhysicsMultiple;
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
    setSession: (state, action: PayloadAction<boolean>) => {
      state.session = action.payload;
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
  setSession,
} = gameSlice.actions;

export const pointsSel = (state: RootState) => state.game.points;
export const livesSel = (state: RootState) => state.game.lives;
export const runningSel = (state: RootState) => state.game.running;
export const controlsSel = (state: RootState) => state.game.controls;
export const sessionSel = (state: RootState) => state.game.session;

export default gameSlice.reducer;
