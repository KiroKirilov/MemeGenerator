import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, Store, applyMiddleware, compose } from "redux";
import { IStore } from "./store/IStore";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { Provider } from "react-redux";
import firebaseConfig from "./config/firebase.config";
import { rootReducer } from "./store/reducers/RootReducer";

const rrfConfig = {
    testCol: 'test-collection'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig, rrfConfig)
    ));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
