import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, Store, applyMiddleware } from "redux";
import { someReducer } from "./store/reducers/SomeReducer";
import { IStore } from "./store/IStore";
import thunk from "redux-thunk";

const store: Store<IStore, any> = createStore(someReducer, applyMiddleware(thunk));

ReactDOM.render(<App store={store} />, document.getElementById("root"));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
