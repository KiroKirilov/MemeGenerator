import { FirebaseError } from "./firebase-error";

export type SomeStore = {
    someProp: string;
    anotherVal: string;
};

export type AuthStore = {
    loginError?: FirebaseError;
    registerError?: FirebaseError;
    isLoading: boolean;
};

export type ReduxStore = {
    some: SomeStore;
    auth: AuthStore;
    firestore: any;
    firebase: any;
};