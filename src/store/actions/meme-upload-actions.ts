import { MemeUploadStore } from "../../types/redux-store";
import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";

export class MemeUploadActions {
    public static getPopularTemplates(uploadedImageSrc: string): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.SET_UPLOADED_IMAGE,
            uploadedImageSrc
        };
    }
}