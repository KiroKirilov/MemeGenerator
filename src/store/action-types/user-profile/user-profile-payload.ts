import { UserProfileActionType } from "./user-profile-action-type";
import { UserMetadata } from "../../../models/user/user-metadata";
import { FirebaseError } from "../../../types/firebase-error";

export type UserProfileActionPayload = {
    type: UserProfileActionType;
    metadata?: UserMetadata;
    newAvatar?: string;
    avatarChangeError?: FirebaseError
};