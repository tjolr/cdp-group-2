import { store } from '../../../state-management/store';
import { setUser } from '../../../state-management/user/userSlice';
import { User } from '../../../state-management/user/userSlice.types';

describe('Test userslice', () => {
  test('setting user', () => {
    const testUser: User = {
      userId: '12345',
      email: 'test@test.com',
      displayName: 'Terry Testson',
      firstName: 'Terry',
      lastName: 'Testson',
    };

    store.dispatch(setUser(testUser));

    const state = store.getState();
    const userSlice = state.user;

    expect(userSlice.userId).toEqual(testUser.userId);
    expect(userSlice.email).toEqual(testUser.email);
    expect(userSlice.displayName).toEqual(testUser.displayName);
    expect(userSlice.firstName).toEqual(testUser.firstName);
    expect(userSlice.lastName).toEqual(testUser.lastName);
  });
});
