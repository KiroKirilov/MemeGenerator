import { ExtendedFirebaseInstance, ExtendedAuthInstance, ExtendedStorageInstance, ExtendedFirestoreInstance } from "react-redux-firebase";

export type GetFirestore = { getFirestore: () => ExtendedFirestoreInstance };

export type FirebaseInstance = ExtendedFirebaseInstance & ExtendedAuthInstance & ExtendedStorageInstance;

export type GetFirebase = { getFirebase: () => FirebaseInstance };