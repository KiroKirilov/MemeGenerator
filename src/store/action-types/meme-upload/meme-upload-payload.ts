import { MemeUploadActionType } from "./meme-upload-actions-type";

export type MemeUploadActionPayload = {
    type: MemeUploadActionType;
    uploadedImageSrc?: string;
};