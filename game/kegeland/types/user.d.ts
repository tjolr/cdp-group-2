import { MinMax } from './../state-management/game/gameSlice.types';
import { UserCredential } from '@firebase/auth-types';

export type AppUser = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
};

export interface UserDocument extends AppUser {
  settings?: UserGameSettings;
}

interface UserGameSettings {
  obstacleSpeed: number;
  lives: number;
  objects: number;
  height: MinMax;
  width: MinMax;
}

export type AppUserCredential = Partial<AppUser> & UserCredential;

export interface SimpleUser {
  email: string;
  password: string;
}

export interface RegisterFormData extends SimpleUser {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
