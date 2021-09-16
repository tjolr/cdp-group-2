import { UserCredential } from '@firebase/auth-types';
import { AppUser, RegisterFormData, SimpleUser } from './../../types/user.d';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../src/firebase/api';
import { RootState } from '../store';
import { User } from './userSlice.types';
import { ApiStatus } from '../../types/state-management';

interface UserState extends User {
  registerUserDefaultThunkStatus: ApiStatus;
  loginUserDefaultThunkStatus: ApiStatus;
}

const initialState: UserState = {
  userId: '',
  email: '',
  displayName: '',
  firstName: '',
  lastName: '',
  registerUserDefaultThunkStatus: 'idle',
  loginUserDefaultThunkStatus: 'idle',
};

export const registerUserDefaultThunk = createAsyncThunk(
  'user/registerUserDefaultThunk',
  async (user: RegisterFormData): Promise<AppUser> => {
    return await API.registerUserDefault(user);
  }
);

export const loginUserDefaultThunk = createAsyncThunk(
  'user/loginUserDefaultThunk',
  async (user: SimpleUser): Promise<UserCredential> => {
    return await API.signInDefault(user);
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
      })
      .addCase(loginUserDefaultThunk.pending, (state) => {
        state.loginUserDefaultThunkStatus = 'loading';
      })
      .addCase(loginUserDefaultThunk.fulfilled, (state, action) => {
        state.loginUserDefaultThunkStatus = 'idle';
        const user = action.payload.user;
        if (user?.email) {
          state.email = action.payload.user?.email ?? '';
          state.userId = user.uid;
          state.displayName = user.displayName ?? '';
        }
      })
      .addCase(loginUserDefaultThunk.rejected, (state) => {
        state.loginUserDefaultThunkStatus = 'failed';
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
export const loginUserDefaultThunkStatusSel = (state: RootState) =>
  state.user.loginUserDefaultThunkStatus;

export default userSlice.reducer;
