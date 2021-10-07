import { UserCredential } from '@firebase/auth-types';
import { AppUser, RegisterFormData, SimpleUser } from '../../types/user';
import { FirestoreApi } from './firestoreApi';
import firebase from 'firebase';
import { AppQuestionnaire } from '../../types/questionnaires';

export namespace API {
  export const signInDefault = async (
    user: SimpleUser
  ): Promise<UserCredential> => {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
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

  export const getUserInfo = async (
    userId: string
  ): Promise<firebase.firestore.DocumentSnapshot<AppUser>> => {
    return FirestoreApi.collectionTypes.users.doc(userId).get();
  };

  export const getQuestionnaire = async (
    name: string
  ): Promise<firebase.firestore.DocumentSnapshot<AppQuestionnaire>> => {
    return FirestoreApi.collectionTypes.questionnaires.doc(name).get();
  };
}
