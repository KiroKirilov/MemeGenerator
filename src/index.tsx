import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore, createFirestoreInstance } from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps } from "react-redux-firebase";
import { Provider } from "react-redux";
import firebaseConfig from "./config/firebase.config";
import { rootReducer } from "./store/reducers/root-reducer";
import { collectionNames } from "./common/constants/collection-names";


const store: any = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebaseConfig)
    ));

const reactReduxFirebaseProps: ReactReduxFirebaseProviderProps = {
    firebase: firebaseConfig,
    config: {
        userProfile: collectionNames.userProfiles,
        useFirestoreForProfile: true,
        presence: "presence"
    },
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById("root"));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
