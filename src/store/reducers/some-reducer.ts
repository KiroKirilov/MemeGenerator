import { SomeStore } from "../../types/redux-store";

const initialState: SomeStore = {
    someProp: "startVal",
    anotherVal: "other val"
};

export const someReducer: any = (state: SomeStore = initialState, action: any): SomeStore => {
    switch (action.type) {
    case "CHANGE_PROP":
        return {
            ...state,
            someProp: action.payload
        };
    default:
        return state;
    }
};