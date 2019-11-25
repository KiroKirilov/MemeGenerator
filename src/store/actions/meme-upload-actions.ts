import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";
import { ImageEditorRef } from "../../types/image-editor-reference";

export class MemeUploadActions {
    public static memeUploaded(uploadedImageSrc: string): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.MEME_UPLOADED,
            uploadedImageSrc
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

    public static resetImage(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.RESET_IMAGE,
        };
    }

    public static editorLoaded(editorRef: React.RefObject<ImageEditorRef>): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.EDITOR_REF_LOADED,
            editorRef
        };
    }
}