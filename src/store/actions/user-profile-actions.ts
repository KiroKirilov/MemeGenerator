import { UserMetadata } from "../../models/user/user-metadata";
import { UserProfileActionType } from "../action-types/user-profile/user-profile-action-type";
import { FunctionAction } from "../../types/function-action";
import { GetState } from "../../types/get-state";
import { collectionNames } from "../../common/constants/collection-names";
import { UserProfileActionPayload } from "../action-types/user-profile/user-profile-payload";
import { Reference } from "@firebase/storage-types";
import { ImageHelpers } from "../../common/helpers/image-helpers";
import { ExtendedFirestoreInstance } from "react-redux-firebase";

export class UserProfileActions {
    public static userProfileLoaded(userId: string): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            let metadata: UserMetadata | undefined = undefined;
            const firestore = getFirestore();
            dispatch({ type: UserProfileActionType.USER_PROFILE_LOADING });
            try {
                const userRef = await firestore.collection(collectionNames.userProfiles).doc(userId).get();
                const userData = userRef.data() as any;
                metadata = {
                    id: userRef.id,
                    username: userData.username,
                    avatarUrl: userData.avatarUrl
                };
            } catch (error) {
                metadata = undefined;
            }

            dispatch({ type: UserProfileActionType.USER_PROFILE_NOT_LOADING });
            dispatch({ type: UserProfileActionType.USER_METADATA_LOADED, metadata: metadata });
        };
    }

    public static profilePictureChanged(newPicB64: string, userId?: string): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            dispatch({ type: UserProfileActionType.USER_AVATAR_CHANGE_LOADING });
            try {
                const fileExtension: string = ImageHelpers.getImageExtensionFromDataUrl(newPicB64);
                const avatarRef: Reference = getFirebase().storage().ref().child(`avatars/${userId}.${fileExtension}`);
                const uploadResult: any = await avatarRef.putString(newPicB64, "data_url").then();
                const imageUrl: string = await uploadResult.ref.getDownloadURL();

                const firestore: ExtendedFirestoreInstance = getFirestore();
                await firestore.collection(collectionNames.userProfiles).doc(userId).update({
                    avatarUrl: imageUrl
                });

                dispatch({ type: UserProfileActionType.AVATAR_CHANGED, newAvatar: imageUrl });
            } catch (error) {
                dispatch({ type: UserProfileActionType.AVATAR_CHANGE_ERRORED, avatarChangeError: error });
            }

        };
    }

    public static avatarRemoved(userId: string, currentAvatarUrl: string): FunctionAction {
        return async (dispatch: any, getState: GetState, { getFirebase, getFirestore }) => {
            dispatch({ type: UserProfileActionType.USER_AVATAR_CHANGE_LOADING });
            try {
                const fileExtension: string = ImageHelpers.getImageExtensionFromUrl(currentAvatarUrl);
                const avatarRef: Reference = getFirebase().storage().ref().child(`avatars/${userId}.${fileExtension}`);
                await avatarRef.delete();

                await getFirestore().collection(collectionNames.userProfiles).doc(userId).update({
                    avatarUrl: null
                });

                dispatch({ type: UserProfileActionType.AVATAR_CHANGED, newAvatar: undefined });
            } catch (error) {
                console.error(error);
                dispatch({ type: UserProfileActionType.AVATAR_CHANGE_ERRORED, avatarChangeError: error });
            }

        };
    }

    public static resetState(): UserProfileActionPayload {
        return { type: UserProfileActionType.RESET_USER_PROFILE_STATE };
    }

    public static errorHandled(): UserProfileActionPayload {
        return { type: UserProfileActionType.AVATAR_CHANGE_ERROR_HANDLED };
    }
}