export type SomeStore = {
    someProp: string;
    anotherVal: string;
}

export type AuthStore = {
    loginError?: string;
}

export type ReduxStore = {
    some: SomeStore;
    auth: AuthStore;
    firestore: any;
    firebase: any;
};