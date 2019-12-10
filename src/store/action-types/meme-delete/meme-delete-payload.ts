import { MemeDeleteActionType } from "./meme-delete-action-type";

export type MemeDeleteActionPayload = {
    type: MemeDeleteActionType;
    memeId?: string
};