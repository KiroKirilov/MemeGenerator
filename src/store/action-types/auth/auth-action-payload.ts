import { FirebaseError } from "../../../types/firebase-error";
import { AuthActionType } from "./auth-actions-type";

export type AuthActionPayload = {
    type: AuthActionType,
    error?: FirebaseError
};