import {
    DocumentData,
    onSnapshot,
    Query,
    QueryConstraint,
    WithFieldValue,
    collection,
    doc,
    deleteDoc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    where,
    query,
} from 'firebase/firestore';

import { db } from './firebase';

export interface Dao<T extends WithFieldValue<DocumentData>> {
    add(id: string, value: T): void;
    get(id: string): Promise<T | null>;
    getAll(filter?: Partial<T>): Promise<T[]>;
    remove(id: string): void;
    subscribe(callback: (result: T[]) => void, filter?: Partial<T>): void;
    update(id: string, value: T): void;
}

export function constructQueryConstraints<T extends object>(
    filter: Partial<T> = {},
): QueryConstraint[] {
    return Object.entries(filter).map(([key, value]) => where(key, '==', value));
}

export function createDataQuery<T extends object>(
    filter: Partial<T>,
    collectionName: string,
    ...pathSegments: string[]
): Query<DocumentData> {
    const usedFilter = filter || {};
    const queryConstraints = constructQueryConstraints(usedFilter);
    const collectionRef = collection(db, collectionName, ...pathSegments);
    return queryConstraints.length ? query(collectionRef, ...queryConstraints) : collectionRef;
}

export function createFirebaseDao<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    ...pathSegments: string[]
): Dao<T> {
    const add: Dao<T>['add'] = async (id, value) => {
        await setDoc(doc(db, collectionName, ...pathSegments, id), value);
    };

    const get: Dao<T>['get'] = async (id) => {
        const snap = await getDoc(doc(db, collectionName, ...pathSegments, id));

        if (snap.exists()) {
            return snap.data() as T;
        }

        return null;
    };

    const remove: Dao<T>['remove'] = async (id) => {
        await deleteDoc(doc(db, collectionName, ...pathSegments, id));
    };

    const update: Dao<T>['update'] = async (id, value) => {
        await updateDoc(doc(db, collectionName, ...pathSegments, id), value);
    };

    const getAll: Dao<T>['getAll'] = async (filter: Partial<T> = {}) => {
        const querySnapshot = await getDocs(
            createDataQuery(filter, collectionName, ...pathSegments),
        );
        return querySnapshot.docs.map((data) => data.data() as T);
    };

    const subscribe: Dao<T>['subscribe'] = (callback, filter = {}) => {
        const dataQuery = createDataQuery(filter, collectionName, ...pathSegments);

        const unsub = onSnapshot(dataQuery, (snapshot) => {
            const data: T[] = [];
            snapshot.forEach((result) => {
                data.push(result.data() as T);
            });

            callback(data);
        });

        return unsub;
    };

    return {
        add,
        get,
        getAll,
        remove,
        subscribe,
        update,
    };
}
