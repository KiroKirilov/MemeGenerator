import { GetFirestore, GetFirebase } from "./get-firestore-firebase";

export type FunctionAction = (dispatch: any, getState: any, { getFirestore, getFirebase }: GetFirestore & GetFirebase) => any | Promise<any>;