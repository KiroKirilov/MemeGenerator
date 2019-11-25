import { MemeUploadActionType } from "./meme-upload-actions-type";
import { ImageEditorRef } from "../../../types/image-editor-reference";

export type MemeUploadActionPayload = {
    type: MemeUploadActionType;
    uploadedImageSrc?: string;
    editorRef?: React.RefObject<ImageEditorRef>;
};