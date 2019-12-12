import { MemeUploadStore } from "../../types/redux-store";
import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";
import { createRef } from "react";
import { ImageEditorRef } from "../../types/image-editor-reference";

const initialState: MemeUploadStore = {
    uploadedImageSrc: undefined,
    isInEdit: false,
    editorRef: createRef<ImageEditorRef>(),
    image: undefined,
    isLoading: false,
    memeSubmitError: undefined,
    memeSuccessfullySubmited: false
};

export const memeUploadReducer: any = (state: MemeUploadStore = initialState, action: MemeUploadActionPayload): MemeUploadStore => {
    switch (action.type.toString()) {
        case MemeUploadActionType.MEME_IMAGE_UPLOADED:
            return {
                ...state,
                uploadedImageSrc: action.uploadedImageSrc,
                isInEdit: false,
                image: action.image
            };

        case MemeUploadActionType.START_IMAGE_EDIT:
            return {
                ...state,
                isInEdit: true
            };

        case MemeUploadActionType.STOP_IMAGE_EDIT:
            return {
                ...state,
                isInEdit: false
            };

        case MemeUploadActionType.RESET_MEME_UPLOAD_STATE:
            return initialState;

        case MemeUploadActionType.IMAGE_EDITOR_REF_LOADED:
            return {
                ...state,
                editorRef: action.editorRef
            };

        case MemeUploadActionType.MEME_SUBMITTED:
            return {
                ...state
            };

        case MemeUploadActionType.MEME_UPLOAD_LOADING:
            return {
                ...state,
                isLoading: true
            };

        case MemeUploadActionType.MEME_UPLOAD_NOT_LOADING:
            return {
                ...state,
                isLoading: false
            };

        case MemeUploadActionType.SUCCESSFULLY_SUBMITTED:
            return {
                ...state,
                memeSuccessfullySubmited: true
            };

        case MemeUploadActionType.MEME_SUBMIT_ERRORED:
            return {
                ...state,
                isLoading: false,
                memeSubmitError: action.memeUploadError
            };

        default:
            return state;
    }
};