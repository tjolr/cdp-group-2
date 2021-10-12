import { QueryDocumentSnapshot } from '@firebase/firestore-types';

import { AppUser } from '../../types/user';
import { AppQuestionnaire } from '../../types/questionnaires';
import { UserDocument } from '../../types/user';
import { firestoredb } from './config';

export namespace FirestoreApi {
  // https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
  // Modified to work with firebase v9, only works if data is an object, not a single value

  const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  });
  const dataPoint = <T>(collectionPath: string) =>
    firestoredb.collection(collectionPath).withConverter(converter<T>());

  export const collectionTypes = {
    // list your collections here
    users: dataPoint<AppUser>('users'),
    questionnaires: dataPoint<AppQuestionnaire>('questionnaires'),
    users: dataPoint<UserDocument>('users'),
  };
}
