import { GetFirestore } from "./GetFirestore";

export type FunctionAction = (dispatch: any, getState: any, { getFirestore }: GetFirestore) => any | Promise<any>;