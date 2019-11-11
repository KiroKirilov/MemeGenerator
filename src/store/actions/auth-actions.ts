import { LoginModel } from "../../models/auth/login-model";
import { FunctionAction } from "../../types/function-action";
import { GetFirebase, FirebaseInstance } from "../../types/get-firestore-firebase";

export class AuthActions {
    public static login(model: LoginModel): FunctionAction {
        return async (dispatch: any, getState: any, { getFirebase }: GetFirebase) => {
            try {
                const firebase: any = getFirebase();

                await firebase.auth().signInWithEmailAndPassword(
                    model.email,
                    model.password
                );

                debugger;
            } catch (error) {
                console.log(error);
                debugger;
            };
        }
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
        }
    }
}