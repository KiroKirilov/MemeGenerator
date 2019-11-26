import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";
import { ImageEditorRef } from "../../types/image-editor-reference";
import { FunctionAction } from "../../types/function-action";
import { ImageHelpers } from "../../common/helpers/image-helpers";

export class MemeUploadActions {
    public static memeUploaded(uploadedImageSrc: string): FunctionAction {
        return async (dispatch: any) => {
            const image: HTMLImageElement = await ImageHelpers.loadImage(uploadedImageSrc);

            dispatch({
                type: MemeUploadActionType.MEME_UPLOADED,
                uploadedImageSrc,
                image
            });
        };
    }

    public static startEditing(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.START_EDIT,
        };
    }

    public static stopEditing(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.STOP_EDIT,
        };
    }

    public static resetState(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.RESET_STATE,
        };
    }

    public static editorLoaded(editorRef: React.RefObject<ImageEditorRef>): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.EDITOR_REF_LOADED,
            editorRef
        };
    }

    public static startLoading(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.START_LOADING,
        };
    }

    public static stopLoading(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.STOP_LOADING,
        };
    }
}