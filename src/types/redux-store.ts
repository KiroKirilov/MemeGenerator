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
    hasErrored: boolean;
    isLoading: boolean;
};

export type MemeUploadStore = {
    uploadedImageSrc?: string;
};

export type ReduxStore = {
    some: SomeStore;
    auth: AuthStore;
    memeTemplates: MemeTemplateStore;
    memeUpload: MemeUploadStore;
    firestore: any;
    firebase: any;
};