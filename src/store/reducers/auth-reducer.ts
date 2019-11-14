import { AuthStore } from "../../types/redux-store";
import { AuthActionType } from "../action-types/auth/auth-actions-type";
import { AuthActionPayload } from "../action-types/auth/auth-action-payload";

const initialState: AuthStore = {
    loginError: undefined,
    registerError: undefined,
    isLoading: false
};

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
                registerError: undefined,
                loginError: undefined
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