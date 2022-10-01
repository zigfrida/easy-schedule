import {
  DocumentData,
  WithFieldValue,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 } from 'uuid';

import { db } from './firebase'

export interface Dao<T extends WithFieldValue<DocumentData>> {
  add(value: T): void;
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  remove(id: string): void;
  update(id: string, value: T): void;
}


export function createFirebaseDao<T extends WithFieldValue<DocumentData>>(collectionName: string): Dao<T> {
  const add: Dao<T>['add'] = async (value) => {
    await setDoc(doc(db, collectionName, v4()), value)
  }

  const get: Dao<T>['get'] = async (id) => {
    const snap = await getDoc(doc(db, collectionName, id));

    if (snap.exists()) {
      return snap.data() as T;
    }

    return null;
  }

  const remove: Dao<T>['remove'] = async (id) => {
    await deleteDoc(doc(db, collectionName, id))
  }

  const update: Dao<T>['update'] = async (id, value) => {
    await updateDoc(doc(db, collectionName, id), value)
  }

  const getAll: Dao<T>['getAll'] = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(data => data.data() as T)
  }

  return {
    add,
    get,
    remove,
    update,
    getAll,
  }
}