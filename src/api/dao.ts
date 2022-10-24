import {
    DocumentData,
    QueryConstraint,
    WithFieldValue,
    collection,
    doc,
    deleteDoc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    updateDoc,
} from 'firebase/firestore';

import { db } from './firebase';

export interface Dao<T extends WithFieldValue<DocumentData>> {
    add(id: string, value: T): void;
    get(id: string): Promise<T | null>;
    getAll(filter?: Partial<T>): Promise<T[]>;
    remove(id: string): void;
    update(id: string, value: T): void;
}

export function constructQueryConstraints<T extends object>(
    filter: Partial<T> = {},
): QueryConstraint[] {
    return Object.entries(filter).map(([key, value]) => where(key, '==', value));
}

export function createFirebaseDao<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
): Dao<T> {
    const add: Dao<T>['add'] = async (id, value) => {
        await setDoc(doc(db, collectionName, id), value);
    };

    const get: Dao<T>['get'] = async (id) => {
        const snap = await getDoc(doc(db, collectionName, id));

        if (snap.exists()) {
            return snap.data() as T;
        }

        return null;
    };

    const remove: Dao<T>['remove'] = async (id) => {
        await deleteDoc(doc(db, collectionName, id));
    };

    const update: Dao<T>['update'] = async (id, value) => {
        await updateDoc(doc(db, collectionName, id), value);
    };

    const getAll: Dao<T>['getAll'] = async (filter?: Partial<T>) => {
        const queryConstraints = constructQueryConstraints(filter);
        const collectionRef = collection(db, collectionName);
        const dataQuery = queryConstraints.length
            ? query(collectionRef, ...queryConstraints)
            : collectionRef;

        const querySnapshot = await getDocs(dataQuery);
        return querySnapshot.docs.map((data) => data.data() as T);
    };

    return {
        add,
        get,
        remove,
        update,
        getAll,
    };
}
