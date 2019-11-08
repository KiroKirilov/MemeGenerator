import { Reducer } from "react";
import { AnyAction } from "redux";
import { IStore } from "../store/IStore";

export type ReduxStore = {
    some: IStore;
    firestore: any;
    firebase: any;
};