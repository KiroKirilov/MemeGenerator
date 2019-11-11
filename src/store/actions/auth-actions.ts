import { LoginModel } from "../../models/auth/login-model";
import { FunctionAction } from "../../types/function-action";
import { GetFirebase, FirebaseInstance } from "../../types/get-firestore-firebase";
import { AuthActionType } from "../action-types/auth-actions-type";

export class AuthActions {
    public static login(model: LoginModel): FunctionAction {
        return async (dispatch: any, getState: any, { getFirebase }: GetFirebase) => {
            try {
                const firebase: any = getFirebase();

                await firebase.auth().signInWithEmailAndPassword(
                    model.email,
                    model.password
                );

                dispatch({type: AuthActionType.LOGIN_SUCCESS});

            } catch (error) {
                console.log(error);
                // TODO: Map error message
                dispatch({type: AuthActionType.LOGIN_ERROR, error});
            }
        };
    }

    public static logout(): FunctionAction {
        return async (dispatch, getState, { getFirebase }) => {
            try {
                const firebase: FirebaseInstance = getFirebase();
                await firebase.auth().signOut();

                // dispatch({ type: 'SIGNOUT_SUCCESS' });
            } catch (error) {
                console.log(error);
                debugger;
            }
        };
    }
}