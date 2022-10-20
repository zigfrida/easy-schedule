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
    where,
    query,
} from 'firebase/firestore';

import { User, Appointment } from '../types';

import { db } from './firebase';

export interface Dao<T extends WithFieldValue<DocumentData>> {
    add(value: T): void;
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    remove(id: string): void;
    update(id: string, value: T): void;
    getAllNurses(): Promise<User[]>;
    getAllSeniorAppointments(id: string): Promise<Appointment[]>;
    getAllNurseAppointments(is: string): Promise<Appointment[]>;
}

export function createFirebaseDao<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
): Dao<T | User | Appointment> {
    const add: Dao<T>['add'] = async (value) => {
        await setDoc(doc(db, collectionName, value.uid), value);
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

    const getAll: Dao<T>['getAll'] = async () => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map((data) => data.data() as T);
    };

    const getAllNurses: Dao<User>['getAllNurses'] = async () => {
        const q = query(collection(db, 'user'), where('userType', '==', 'nurse'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((data) => data.data() as User);
    };

    const getAllSeniorAppointments: Dao<Appointment>['getAllSeniorAppointments'] = async (id) => {
        const q = query(collection(db, 'appointment'), where('senior', '==', id));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((data) => data.data() as Appointment);
    };

    const getAllNurseAppointments: Dao<Appointment>['getAllNurseAppointments'] = async (id) => {
        const q = query(collection(db, 'appointment'), where('nurse', '==', id));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((data) => data.data() as Appointment);
    };

    return {
        add,
        get,
        remove,
        update,
        getAll,
        getAllNurses,
        getAllSeniorAppointments,
        getAllNurseAppointments,
    };
}
