import { FirebaseError } from "./firebase-error";
import { MemeTemplate } from "../models/memes/meme-template";

export type SomeStore = {
    someProp: string;
    anotherVal: string;
};

export type AuthStore = {
    loginError?: FirebaseError;
    registerError?: FirebaseError;
    isLoading: boolean;
};

export type MemeTemplateStore = {
    templates: MemeTemplate[];
};

export type ReduxStore = {
    some: SomeStore;
    auth: AuthStore;
    memeTemplates: MemeTemplateStore;
    firestore: any;
    firebase: any;
};