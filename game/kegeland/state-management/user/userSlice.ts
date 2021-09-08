import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from './userSlice.types';

interface UserState extends User {}

const initialState: UserState = {
  userId: '',
  email: '',
  displayName: '',
  firstName: '',
  lastName: '',
};

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
});

export const { setUser } = userSlice.actions;

export const userIdSel = (state: RootState) => state.user.userId;
export const emailSel = (state: RootState) => state.user.email;
export const displayNameSel = (state: RootState) => state.user.displayName;
export const firstNameSel = (state: RootState) => state.user.firstName;
export const lastNameSel = (state: RootState) => state.user.lastName;

export default userSlice.reducer;
