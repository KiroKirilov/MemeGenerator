import { AuthStore } from "../../types/redux-store";
import { AuthActionType } from "../action-types/auth-actions-type";
import { FirebaseError } from "../../types/firebase-error";

const initialState: AuthStore = {
    loginError: undefined,
    registerError: undefined,
    isLoading: false
};

type AuthActionPayload = {
    type: AuthActionType,
    error: FirebaseError
}

export const authReducer: any = (state: AuthStore = initialState, action: AuthActionPayload): AuthStore => {
    switch (action.type) {
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                loginError: action.error
            };

        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                loginError: undefined
            };

        case AuthActionType.REGISTER_ERROR:
            return {
                ...state,
                registerError: action.error
            };

        case AuthActionType.REGISTER_SUCCESS:
            return {
                ...state,
                registerError: undefined
            };

        case AuthActionType.IS_LOADING:
            return {
                ...state,
                isLoading: true,
                registerError: undefined
            };

        case AuthActionType.IS_NOT_LOADING:
            return {
                ...state,
                isLoading: false
            };


        case AuthActionType.LOGOUT_SUCCESS:
            return state;
        default:
            return state;
    }
};