import { RootState } from './../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import PhysicsOne from '../../physics/physicsOne';
import PhysicsMultiple from '../../physics/physicsMultiple';
import PhysicsSensorData from '../../physics/physicsSensorData';
import { userIdSel } from '../user/userSlice';
import { API } from '../../src/firebase/api';
import { GameData } from '../../types/game';
import { GameState } from './gameSlice.types';
import { GameMode } from './gameMode';
import { UserGameSettings } from '../../types/user';

const initialState: GameState = {
  gameId: '',
  points: 0,
  lives: 3,
  settings: {
    obstacleSpeed: 2,
    lives: 3,
    objects: 1,
    height: {
      min: 0.4,
      max: 0.5,
    },
    width: {
      min: 250,
      max: 400,
    },
  },
  obstacleSpeed: -3,
  running: false,
  controls: PhysicsOne,
  session: false,
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
  async (_, { getState }): Promise<UserGameSettings | undefined> => {
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
    clearGame: (state, action: PayloadAction<GameMode>) => {
      state.points = 0;
      state.gameId = '';
      state.lives = 3;
      state.running = true;

      switch (action.payload) {
        case GameMode.OneControl:
          state.controls = PhysicsOne;
          break;
        case GameMode.MultiControl:
          state.controls = PhysicsMultiple;
          break;
        case GameMode.SensorDataTestControl:
          state.controls = PhysicsSensorData;
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
          state.settings = userGameSettings;
        }
        state.running = true;
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
  setSession,
} = gameSlice.actions;

export const pointsSel = (state: RootState) => state.game.points;
export const livesSel = (state: RootState) => state.game.lives;
export const runningSel = (state: RootState) => state.game.running;
export const controlsSel = (state: RootState) => state.game.controls;
export const sessionSel = (state: RootState) => state.game.session;
export const obstacleSpeedSel = (state: RootState) =>
  state.game.settings.obstacleSpeed;
export const userGameSettingsSel = (state: RootState) => state.game.settings;
export const getUserGameSettingsStatusSel = (state: RootState) =>
  state.game.getUserGameSettingsStatus;

export default gameSlice.reducer;
