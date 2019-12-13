import { FirebaseError } from "./firebase-error";
import { MemeTemplate } from "../models/memes/meme-template";
import { ImageEditorRef } from "./image-editor-reference";
import { SortType } from "../models/meme-operations/sort-type";
import { Tag } from "../models/memes/tag";
import { UserMetadata } from "../models/user/user-metadata";

export type AuthStore = {
    loginError?: FirebaseError;
    registerError?: FirebaseError;
    isLoading: boolean;
};

export type MemeTemplateStore = {
    templates: MemeTemplate[];
    hasErrored: boolean;
    isLoading: boolean;
};

export type MemeUploadStore = {
    uploadedImageSrc?: string;
    isInEdit: boolean;
    editorRef?: React.RefObject<ImageEditorRef>;
    image?: HTMLImageElement;
    isLoading: boolean;
    memeSubmitError?: FirebaseError;
    memeSuccessfullySubmited: boolean;
};

export type MemeOperationsStore = {
    sortType: SortType;
    tagFilters: Tag[];
};

export type UserProfileStore = {
    userMetadata?: UserMetadata;
    userProfileLoading: boolean;
    avatarChangeError?: FirebaseError;
    avatarChangeLoading: boolean;
};

export type MemeDeleteStore = {
    deletedMemeId?: string;
    memeDeleteError: boolean;
};

export type ReduxStore = {
    auth: AuthStore;
    memeTemplates: MemeTemplateStore;
    memeUpload: MemeUploadStore;
    memeOperations: MemeOperationsStore;
    userProfile: UserProfileStore;
    memeDelete: MemeDeleteStore;
    firestore: any;
    firebase: any;
};