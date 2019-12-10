import { MemeDeleteStore } from "../../types/redux-store";
import { MemeDeleteActionPayload } from "../action-types/meme-delete/meme-delete-payload";
import { MemeDeleteActionType } from "../action-types/meme-delete/meme-delete-action-type";

const initialState: MemeDeleteStore = {
    deletedMemeId: undefined,
    memeDeleteError: false
};

export const memeDeleteReducer: any = (state: MemeDeleteStore = initialState, action: MemeDeleteActionPayload): MemeDeleteStore => {
    switch (action.type) {
        case MemeDeleteActionType.MEME_DELETED:
            return {
                ...state,
                memeDeleteError: false,
                deletedMemeId: action.memeId
            };

        case MemeDeleteActionType.MEME_DELETE_ERROR:
            return {
                ...state,
                memeDeleteError: true
            };

        case MemeDeleteActionType.MEME_DELETE_ERROR_HANDLED:
            return {
                ...state,
                memeDeleteError: false
            };

        default:
            return state;
    }
};