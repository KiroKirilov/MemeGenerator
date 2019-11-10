import { Reducer } from "react";
import { AnyAction } from "redux";
import { IStore } from "../store/store";

export type ReduxStore = {
    some: IStore;
    firestore: any;
    firebase: any;
};