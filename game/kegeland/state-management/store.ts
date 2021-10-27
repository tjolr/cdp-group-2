import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import gameReducer from './game/gameSlice';
import sessionReducer from './session/sessionSlice';
import registrationReducer from './registrationQuestionnaire/registrationQuestSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    session: sessionReducer,
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
