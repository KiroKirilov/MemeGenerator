import { combineReducers } from "redux";
import { someReducer } from "./SomeReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export const rootReducer: any = combineReducers({
    some: someReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});