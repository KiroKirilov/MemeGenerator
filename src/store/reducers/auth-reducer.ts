import { AuthStore } from "../../types/redux-store";
import { AuthActionType } from "../action-types/auth-actions-type";

const initialState: AuthStore = {
    loginError: undefined
};

type AuthActionPayload = {
    type: AuthActionType,
    error: Error
}

export const authReducer: any = (state: AuthStore = initialState, action: AuthActionPayload): AuthStore => {
    switch (action.type) {
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                loginError: "OPAAAAAAAAAA"
            };

        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                loginError: undefined
            };

        case AuthActionType.LOGOUT_SUCCESS:
            return state;
        default:
            return state;
    }
};