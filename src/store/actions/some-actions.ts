import { GetFirestore } from "../../types/get-firestore-firebase";
import { FunctionAction } from "../../types/function-action";

export class SomeActions {
    public static makeChange(newval: string): FunctionAction {
        return async (dispatch: any, getState: any, { getFirestore }: GetFirestore) => {
            try {
                const firestore: any = getFirestore();
                await firestore
                    .collection("test-collection")
                    .add({
                        title: "new one",
                        content: "new content",
                        createdAt: new Date()
                    });
            } catch (error) {
                console.log(error);
            }

            dispatch({ type: "CHANGE_PROP", payload: newval });
        };
    }
}