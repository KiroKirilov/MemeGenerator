import { MemeTemplateActionType } from "./meme-template-actions-type";
import { MemeTemplate } from "../../../models/memes/meme-template";

export type MemeTemplateActionPayload = {
    type: MemeTemplateActionType;
    templates: MemeTemplate[];
};