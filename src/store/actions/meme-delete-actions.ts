import { FunctionAction } from "../../types/function-action";
import { GetState } from "../../types/get-state";
import { MemeDeleteActionType } from "../action-types/meme-delete/meme-delete-action-type";

export class MemeDeleteActions {
    public static memeDeleted(memeId: string): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            try {
                console.log("deleted");
                dispatch({ type: MemeDeleteActionType.MEME_DELETED, memeId: memeId });
            } catch (error) {
                dispatch({ type: MemeDeleteActionType.MEME_DELETE_ERROR });
            }
        };
    }
}
