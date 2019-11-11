import { FirebaseError } from "@firebase/util";

export type SomeStore = {
    someProp: string;
    anotherVal: string;
};

export type AuthStore = {
    loginError?: FirebaseError;
};

export type ReduxStore = {
    some: SomeStore;
    auth: AuthStore;
    firestore: any;
    firebase: any;
};