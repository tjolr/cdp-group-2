import { GameMode } from '../../../state-management/game/gameMode';
import {
  clearGame,
  decrementLives,
  getUserGameSettingsThunk,
  incrementPoints,
  restoreLives,
  setGameId,
  setSession,
  stopGame,
} from '../../../state-management/game/gameSlice';
import { store } from '../../../state-management/store';

describe('Test gameSlice reducers', () => {
  it('Should set game id', () => {
    const testGameId = '13kjh39728937khj3kj2jk3';
    store.dispatch(setGameId(testGameId));

    const state = store.getState();

    expect(state.game.gameId).toEqual(testGameId);
  });

  it('Should Increment points', () => {
    const pointsBefore = store.getState().game.points;

    store.dispatch(incrementPoints());

    const pointsAfter = store.getState().game.points;

    expect(pointsAfter).toBeGreaterThan(pointsBefore);
  });

  it('Should clear game', () => {
    store.dispatch(clearGame(GameMode.OneControl));

    const gameState = store.getState().game;

    expect(gameState.points).toBe(0);
    expect(gameState.gameId).toBe('');
    expect(gameState.lives).toBe(3);
    expect(gameState.running).toBe(true);
  });

  it('Should decrement lives', () => {
    const livesBefore = store.getState().game.lives;

    store.dispatch(decrementLives());

    const livesAfter = store.getState().game.lives;

    expect(livesAfter).toBeLessThan(livesBefore);
  });

  it('Should restore lives', () => {
    store.dispatch(restoreLives());
    const lives = store.getState().game.lives;

    expect(lives).toBe(3);
  });

  it('Should stop game', () => {
    store.dispatch(stopGame());
    const running = store.getState().game.running;

    expect(running).toBe(false);
  });

  it('Should set session to True', () => {
    store.dispatch(setSession(true));
    const session = store.getState().game.session;

    expect(session).toBe(true);
  });
});

describe('Test gameSlice extraReducers', () => {
  it('Should set session to True', () => {
    const getUserGameSettingsStatusBefore =
      store.getState().game.getUserGameSettingsStatus;
    expect(getUserGameSettingsStatusBefore).toBe('idle');

    store.dispatch(getUserGameSettingsThunk());

    const getUserGameSettingsStatusAfter =
      store.getState().game.getUserGameSettingsStatus;
    expect(getUserGameSettingsStatusAfter).toBe('loading');
  });
});
