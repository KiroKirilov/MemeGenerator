import { combineReducers } from "redux";
import { someReducer } from "./SomeReducer";
import { firestoreReducer } from "redux-firestore";


export const rootReducer = combineReducers({
    some: someReducer,
    firestore: firestoreReducer
})