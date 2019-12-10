import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { authReducer } from "./auth-reducer";
import { memeTemplateReducer } from "./meme-template-reducer";
import { memeUploadReducer } from "./meme-upload-reducer";
import { memeOperationsReducer } from "./meme-operations-reducer";
import { userProfileReducer } from "./user-profile-reducer";
import { memeDeleteReducer } from "./meme-delete-reducer";

export const rootReducer: any = combineReducers({
    auth: authReducer,
    memeTemplates: memeTemplateReducer,
    memeUpload: memeUploadReducer,
    memeOperations: memeOperationsReducer,
    userProfile: userProfileReducer,
    memeDelete: memeDeleteReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});