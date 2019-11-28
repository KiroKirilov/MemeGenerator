import { MemeUploadActionType } from "../action-types/meme-upload/meme-upload-actions-type";
import { MemeUploadActionPayload } from "../action-types/meme-upload/meme-upload-payload";
import { ImageEditorRef } from "../../types/image-editor-reference";
import { FunctionAction } from "../../types/function-action";
import { ImageHelpers } from "../../common/helpers/image-helpers";
import { MemeMetadata } from "../../models/memes/meme-metadata";
import { GetState } from "../../types/get-state";
import { FirebaseInstance } from "../../types/get-firestore-firebase";
import { Reference } from "@firebase/storage-types";
import { StringHelpers } from "../../common/helpers/string-helpers";
import { ReduxStore } from "../../types/redux-store";
import { Meme } from "../../models/memes/meme";
import { collectionNames } from "../../common/constants/collection-names";

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
            type: MemeUploadActionType.MEME_UPLOAD_LOADING,
        };
    }

    public static stopLoading(): MemeUploadActionPayload {
        return {
            type: MemeUploadActionType.MEME_UPLOAD_NOT_LOADING,
        };
    }

    public static memeSubmitted(metadata: MemeMetadata): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            try {
                dispatch(MemeUploadActions.startLoading());
                const store: ReduxStore = getState();
                const imageSrc: string = store.memeUpload.uploadedImageSrc || "";
                const dataUrl: string = await ImageHelpers.ensureDataUrl(imageSrc);

                const userId: string = store.firebase.auth.uid;
                const guid: string = StringHelpers.generateGuid();

                const firebase: FirebaseInstance = getFirebase();
                const storageRef: Reference = firebase.storage().ref();
                const fileExtension: string = ImageHelpers.getImageExtensionFromDataUrl(dataUrl);
                const memeImageRef: Reference = storageRef.child(`memes/${userId}/${guid}.${fileExtension}`);
                await memeImageRef.putString(dataUrl, "data_url").then();
                const imageUrl: string = await memeImageRef.getDownloadURL();

                const firestore: any = getFirestore();

                const memeModel: Meme = {
                    title: metadata.title,
                    tags: metadata.tags,
                    createdBy: firestore.doc(`users/${userId}`),
                    createdOn: new Date(),
                    imageUrl: imageUrl
                };

                await firestore
                    .collection(collectionNames.memes)
                    .add(memeModel);

                debugger;
            } catch (error) {
                console.error(error);
                debugger;
            }
        };
    }
}