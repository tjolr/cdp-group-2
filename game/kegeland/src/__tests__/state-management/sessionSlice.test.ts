import {
  incrementGame,
  setSessionId,
} from '../../../state-management/session/sessionSlice';
import { store } from '../../../state-management/store';

describe('Test sessionSlice reducers', () => {
  it('Should set session Id', () => {
    const testSessionId = 'kjhk32893131kj';

    store.dispatch(setSessionId(testSessionId));

    const sessionId = store.getState().session.sessionId;
    expect(sessionId).toBe(testSessionId);
  });

  it('Should increment number of games in session', () => {
    const currentGameBefore = store.getState().session.currentGame;

    store.dispatch(incrementGame());

    const currentGameAfter = store.getState().session.currentGame;

    expect(currentGameAfter).toBeGreaterThan(currentGameBefore);
  });
});
