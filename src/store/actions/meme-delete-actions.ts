import { FunctionAction } from "../../types/function-action";
import { GetState } from "../../types/get-state";
import { MemeDeleteActionType } from "../action-types/meme-delete/meme-delete-action-type";
import { collectionNames } from "../../common/constants/collection-names";
import { MemeDeleteActionPayload } from "../action-types/meme-delete/meme-delete-payload";
import { Meme } from "../../models/memes/meme";
export class MemeDeleteActions {
    public static memeDeleted(meme: Meme): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            try {
                const collectionDocDeletePromise = getFirestore().collection(collectionNames.memes).doc(meme.id).delete();
                const storageDocDeletePromise = getFirebase().storage().ref().child(meme.storageLocation).delete();
                await collectionDocDeletePromise;
                await storageDocDeletePromise;
                dispatch({ type: MemeDeleteActionType.MEME_DELETED, memeId: meme.id });
            } catch (error) {
                dispatch({ type: MemeDeleteActionType.MEME_DELETE_ERROR });
            }
        };
    }

    public static errorHandled(): MemeDeleteActionPayload {
        return { type: MemeDeleteActionType.MEME_DELETE_ERROR_HANDLED };
    }
}
