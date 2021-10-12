import { RootState } from './../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import PhysicsOne from '../../physics/physicsOne';
import PhysicsMultiple from '../../physics/physicsMultiple';
import { GameState } from './gameSlice.types';
import { userIdSel } from '../user/userSlice';
import { API } from '../../src/firebase/api';
import { GameData } from '../../types/game';

const initialState: GameState = {
  gameId: '',
  points: 0,
  lives: 3,
  obstacleSpeed: -3,
  running: false,
  controls: PhysicsOne,
  saveGameDataStatus: 'idle',
  getUserGameSettingsStatus: 'idle',
};

export const saveGameDataThunk = createAsyncThunk(
  'game/saveGameDataThunk',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const userId = userIdSel(rootState);
    const points = pointsSel(rootState);

    const gameData: GameData = { points };

    return await API.saveGameData(gameData, userId);
  }
);

export const getUserGameSettingsThunk = createAsyncThunk(
  'game/getUserGameSettingsThunk',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const userId = userIdSel(rootState);

    return await API.getUserGameSettings(userId);
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveGameDataThunk.pending, (state) => {
        state.saveGameDataStatus = 'loading';
      })
      .addCase(saveGameDataThunk.fulfilled, (state) => {
        state.saveGameDataStatus = 'idle';
      })
      .addCase(saveGameDataThunk.rejected, (state) => {
        state.saveGameDataStatus = 'failed';
      })
      .addCase(getUserGameSettingsThunk.pending, (state) => {
        state.getUserGameSettingsStatus = 'loading';
        state.running = false;
      })
      .addCase(getUserGameSettingsThunk.fulfilled, (state, action) => {
        state.getUserGameSettingsStatus = 'idle';
        const userGameSettings = action.payload;

        if (userGameSettings) {
          state.obstacleSpeed = userGameSettings?.speed;
          state.running = true;
        }
      })
      .addCase(getUserGameSettingsThunk.rejected, (state) => {
        state.getUserGameSettingsStatus = 'failed';
      });
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
export const obstacleSpeedSel = (state: RootState) => state.game.obstacleSpeed;

export default gameSlice.reducer;
