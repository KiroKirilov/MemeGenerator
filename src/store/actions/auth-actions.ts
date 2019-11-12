import { LoginModel } from "../../models/auth/login-model";
import { FunctionAction } from "../../types/function-action";
import { GetFirebase, FirebaseInstance } from "../../types/get-firestore-firebase";
import { AuthActionType } from "../action-types/auth-actions-type";
import { FirebaseError } from "@firebase/util";
import { RegisterModel } from "../../models/auth/register-model";
import { collectionNames } from "../../common/constants/collection-names";
import { UserCredential } from "@firebase/auth-types";

export class AuthActions {
    public static login(model: LoginModel): FunctionAction {
        return async (dispatch: any, getState: any, { getFirebase }: GetFirebase) => {
            try {
                const firebase: any = getFirebase();

                await firebase.auth().signInWithEmailAndPassword(
                    model.email,
                    model.password
                );

                dispatch({ type: AuthActionType.LOGIN_SUCCESS });

            } catch (error) {
                dispatch({ type: AuthActionType.LOGIN_ERROR, error });
            }
        };
    }

    public static register(model: RegisterModel): FunctionAction {
        return async (dispatch, getState, { getFirebase, getFirestore }) => {
            try {
                debugger;
                const firebase: FirebaseInstance = getFirebase();
                const firestore = getFirestore();
                const newUserInfo: UserCredential = await firebase.auth().createUserWithEmailAndPassword(model.email, model.password);
                const userId = newUserInfo.user ? newUserInfo.user.uid : null;
                const profileAddPromise: Promise<any> = firestore.collection(collectionNames.userProfiles).doc(userId).set({
                    username: model.username
                });

                const usernamesAddPromise: Promise<any> = firestore.collection(collectionNames.usernames).add({
                    username: model.username,
                    userId: userId
                });

                await profileAddPromise;
                await usernamesAddPromise;
                debugger;
            } catch (error) {
                console.log(error);
                debugger;
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