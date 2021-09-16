import { AppUser } from './../../types/user.d';
import { RegisterFormData } from './../../src/screens/Register/RegisterScreen';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import { RootState } from '../store';
import { User } from './userSlice.types';
import { ApiStatus } from '../../types/state-management';

interface UserState extends User {
  registerUserDefaultThunkStatus: ApiStatus;
}

const initialState: UserState = {
  userId: '',
  email: '',
  displayName: '',
  firstName: '',
  lastName: '',
  registerUserDefaultThunkStatus: 'idle',
};

export const registerUserDefaultThunk = createAsyncThunk(
  'user/registerUserDefaultThunk',
  async (user: RegisterFormData): Promise<AppUser> => {
    return await API.registerUserDefault(user);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { userId, email, displayName, firstName, lastName } =
        action.payload;
      state.userId = userId;
      state.email = email;
      state.displayName = displayName;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserDefaultThunk.pending, (state) => {
        state.registerUserDefaultThunkStatus = 'loading';
      })
      .addCase(registerUserDefaultThunk.fulfilled, (state, action) => {
        state.registerUserDefaultThunkStatus = 'idle';
        const { id, email, firstName, lastName } = action.payload;
        if (id) {
          state.userId = id;
          state.email = email;
          state.firstName = firstName;
          state.lastName = lastName;
        }
      })
      .addCase(registerUserDefaultThunk.rejected, (state) => {
        state.registerUserDefaultThunkStatus = 'failed';
      });
  },
});

export const { setUser } = userSlice.actions;

export const userIdSel = (state: RootState) => state.user.userId;
export const emailSel = (state: RootState) => state.user.email;
export const displayNameSel = (state: RootState) => state.user.displayName;
export const firstNameSel = (state: RootState) => state.user.firstName;
export const lastNameSel = (state: RootState) => state.user.lastName;
export const registerUserDefaultThunkStatusSel = (state: RootState) =>
  state.user.registerUserDefaultThunkStatus;

export default userSlice.reducer;
