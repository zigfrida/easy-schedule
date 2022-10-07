import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyCbrO1ECZ70umezyA797kvvrXHSvVMtcPY',
    authDomain: 'easy-schedule-34f43.firebaseapp.com',
    projectId: 'easy-schedule-34f43',
    storageBucket: 'easy-schedule-34f43.appspot.com',
    messagingSenderId: '1070031815112',
    appId: '1:1070031815112:web:b27f7be81affaed6d040fd',
    measurementId: 'G-0KBKN0ZKYV',
};

var app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
