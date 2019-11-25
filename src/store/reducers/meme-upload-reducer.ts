import { MemeUploadStore } from "../../types/redux-store";
import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";
import { createRef } from "react";
import { ImageEditorRef } from "../../types/image-editor-reference";


const initialState: MemeUploadStore = {
    uploadedImageSrc: undefined,
    isInEdit: false,
    editorRef: createRef<ImageEditorRef>()
};

export const memeUploadReducer: any = (state: MemeUploadStore = initialState, action: MemeUploadActionPayload): MemeUploadStore => {
    switch (action.type) {
        case MemeUploadActionType.MEME_UPLOADED:
            return {
                ...state,
                uploadedImageSrc: action.uploadedImageSrc,
                isInEdit: false
            };

        case MemeUploadActionType.START_EDIT:
            return {
                ...state,
                isInEdit: true
            };

        case MemeUploadActionType.STOP_EDIT:
            return {
                ...state,
                isInEdit: false
            };

        case MemeUploadActionType.RESET_IMAGE:
            return initialState;

        case MemeUploadActionType.EDITOR_REF_LOADED:
            return {
                ...state,
                editorRef: action.editorRef
            };

        default:
            return state;
    }
};