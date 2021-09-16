import { UserCredential } from '@firebase/auth-types';
import { RegisterFormData } from '../screens/Register/RegisterScreen';
import { AppUser } from '../../types/user';
import { firestoredb } from './config';
import { FirestoreApi } from './firestoreApi';
import firebase from 'firebase';

export namespace API {
  export const signInDefault = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  export const registerUserDefault = async (
    registerUser: RegisterFormData
  ): Promise<AppUser> => {
    const registerResponse = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        registerUser.email,
        registerUser.password
      );

    const newUser: AppUser = {
      id: registerResponse.user?.uid,
      email: registerUser.email,
      firstName: registerUser.firstName,
      lastName: registerUser.lastName,
    };
    registerResponse.user && (await saveUser(newUser));

    return newUser;
  };

  const saveUser = async (user: AppUser) => {
    return FirestoreApi.collectionTypes.users.doc(user.id).set(user);
  };

  export const writeTest = async () => {
    // Add a new document in collection "cities"
    firestoredb.collection('cities').doc('LA').set({
      name: 'Los Angeles',
      state: 'CAaaaa',
      country: 'USA',
    });
  };
}
