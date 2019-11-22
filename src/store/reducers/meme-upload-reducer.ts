import { MemeUploadStore } from "../../types/redux-store";
import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";


const initialState: MemeUploadStore = {
    uploadedImageSrc: undefined
};

export const memeUploadReducer: any = (state: MemeUploadStore = initialState, action: MemeUploadActionPayload): MemeUploadStore => {
    switch (action.type) {
        case MemeUploadActionType.SET_UPLOADED_IMAGE:
            return {
                ...state,
                uploadedImageSrc: action.uploadedImageSrc
            };

        default:
            return state;
    }
};