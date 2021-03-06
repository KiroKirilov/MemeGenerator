import { UserProfileStore } from "../../types/redux-store";
import { UserProfileActionPayload } from "../action-types/user-profile/user-profile-payload";
import { UserMetadata } from "../../models/user/user-metadata";
import { UserProfileActionType } from "../action-types/user-profile/user-profile-action-type";

const initialState: UserProfileStore = {
    userMetadata: undefined,
    userProfileLoading: false,
    avatarChangeError: undefined,
    avatarChangeLoading: false
};

export const userProfileReducer: any = (state: UserProfileStore = initialState, action: UserProfileActionPayload): UserProfileStore => {
    switch (action.type) {
        case UserProfileActionType.AVATAR_CHANGED:
            const oldMetadata: UserMetadata = state.userMetadata || {
                id: "",
                username: "",
                avatarUrl: ""
            };
            return {
                ...state,
                avatarChangeLoading: false,
                userMetadata: {
                    ...oldMetadata,
                    avatarUrl: action.newAvatar || ""
                }
            };

        case UserProfileActionType.USER_METADATA_LOADED:
            return {
                ...state,
                userMetadata: action.metadata,
                userProfileLoading: false
            };

        case UserProfileActionType.USER_PROFILE_LOADING:
            return {
                ...state,
                userProfileLoading: true
            };

        case UserProfileActionType.AVATAR_CHANGE_ERRORED:
            return {
                ...state,
                avatarChangeError: action.avatarChangeError,
                avatarChangeLoading: false
            };

        case UserProfileActionType.AVATAR_CHANGE_ERROR_HANDLED:
            return {
                ...state,
                avatarChangeError: undefined,
                avatarChangeLoading: false
            };

        case UserProfileActionType.USER_AVATAR_CHANGE_LOADING:
            return {
                ...state,
                avatarChangeLoading: true
            }

        case UserProfileActionType.RESET_USER_PROFILE_STATE:
            return initialState;

        default:
            return state;
    }
};