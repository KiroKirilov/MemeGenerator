import { combineReducers } from "redux";
import { someReducer } from "./some-reducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { authReducer } from "./auth-reducer";
import { memeTemplateReducer } from "./meme-template-reducer";

export const rootReducer: any = combineReducers({
    some: someReducer,
    auth: authReducer,
    memeTemplates: memeTemplateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});