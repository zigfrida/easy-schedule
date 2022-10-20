import {
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

import { Appointment } from '../types';

import { db } from './firebase';

export interface AppointmentDAO {
    add(value: Appointment): void;
    get(id: string): Promise<Appointment | null>;
    getAll(): Promise<Appointment[]>;
    remove(id: string): void;
    update(id: string, value: Appointment): void;
    getAllSeniorAppointments(id: string): Promise<Appointment[]>;
    getAllNurseAppointments(id: string): Promise<Appointment[]>;
}

export function createFirebaseDao(): AppointmentDAO {
    const add: AppointmentDAO['add'] = async (value) => {
        await setDoc(doc(db, 'appointment', value.uid), value);
    };

    const get: AppointmentDAO['get'] = async (id) => {
        const snap = await getDoc(doc(db, 'appointment', id));

        if (snap.exists()) {
            return snap.data() as Appointment;
        }

        return null;
    };

    const remove: AppointmentDAO['remove'] = async (id) => {
        await deleteDoc(doc(db, 'appointment', id));
    };

    const update: AppointmentDAO['update'] = async (id, value) => {
        await updateDoc(doc(db, 'appointment', id), value);
    };

    const getAll: AppointmentDAO['getAll'] = async () => {
        const querySnapshot = await getDocs(collection(db, 'appointment'));
        return querySnapshot.docs.map((data) => data.data() as Appointment);
    };

    const getAllSeniorAppointments: AppointmentDAO['getAllSeniorAppointments'] = async (id) => {
        const q = query(collection(db, 'appointment'), where('senior', '==', id));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((data) => data.data() as Appointment);
    };

    const getAllNurseAppointments: AppointmentDAO['getAllNurseAppointments'] = async (id) => {
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
        getAllSeniorAppointments,
        getAllNurseAppointments,
    };
}
