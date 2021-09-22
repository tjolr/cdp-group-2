import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import gameReducer from './game/gameSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
