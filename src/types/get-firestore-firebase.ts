import { ExtendedFirebaseInstance, ExtendedAuthInstance, ExtendedStorageInstance } from "react-redux-firebase";

export type GetFirestore = { getFirestore: () => any };

export type FirebaseInstance = ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance;

export type GetFirebase = { getFirebase: () => FirebaseInstance };