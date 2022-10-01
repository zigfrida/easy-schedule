import {
  Unsubscribe,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth';

import { ArgumentTypes } from '../types';

import { auth } from './firebase';

type RegisterReturnType =  ReturnType<typeof firebaseCreateUserWithEmailAndPassword>;
type SignInReturnType = ReturnType<typeof firebaseSignInWithEmailAndPassword>;

// Should be alright. The generic should take in any generic functions
// eslint-disable-next-line @typescript-eslint/ban-types
type AuthStateChangedParameters<F extends Function> =
  // According to a typescript-eslint maintainer, the use of any here is
  // valid. https://github.com/typescript-eslint/typescript-eslint/issues/2584#issuecomment-696534825
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ArgumentTypes<F> extends [first: any, ...rest: infer B] ? B : never;

export function createUserWithEmailAndPassword(email: string, password: string): RegisterReturnType {
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmailAndPassword(email: string, password: string): SignInReturnType {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

export function onAuthStateChanged(...args: AuthStateChangedParameters<typeof firebaseOnAuthStateChanged>): Unsubscribe {
  return firebaseOnAuthStateChanged(auth, ...args);
}