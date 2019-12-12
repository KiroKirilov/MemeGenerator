import { MemeUploadActionType } from "./meme-upload-actions-type";
import { ImageEditorRef } from "../../../types/image-editor-reference";
import { FirebaseError } from "../../../types/firebase-error";

export type MemeUploadActionPayload = {
    type: MemeUploadActionType;
    uploadedImageSrc?: string;
    editorRef?: React.RefObject<ImageEditorRef>;
    image?: HTMLImageElement;
    memeUploadError?: FirebaseError;
};