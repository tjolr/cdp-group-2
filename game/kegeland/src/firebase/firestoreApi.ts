import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';
import {
  QueryDocumentSnapshot,
  WithFieldValue,
  FieldValue,
  DocumentData,
  SnapshotOptions,
} from 'firebase/firestore';
import { AppUser } from '../../types/user';

// https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
// Modified to work with firebase v9, only works if data is an object, not a single value
const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => {
    return {
      ...(data as { [K in keyof T]: FieldValue | WithFieldValue<T[K]> }),
    };
  },
  fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions): T => {
    return snap.data() as T;
  },
});

const datapoint = <T>(collectionPath: string) =>
  collection(getFirestore(), collectionPath).withConverter(converter<T>());

const db = {
  users: datapoint<AppUser>('users'),
};

export namespace FirestoreApi {}
