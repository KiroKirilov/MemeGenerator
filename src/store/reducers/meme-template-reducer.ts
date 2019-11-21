import { MemeTemplateStore } from "../../types/redux-store";
import { MemeTemplateActionPayload } from "../action-types/meme-template/meme-template-payload";
import { MemeTemplateActionType } from "../action-types/meme-template/meme-template-actions-type";

const initialState: MemeTemplateStore = {
    templates: []
};

export const memeTemplateReducer: any = (state: MemeTemplateStore = initialState, action: MemeTemplateActionPayload): MemeTemplateStore => {
    switch (action.type) {
        case MemeTemplateActionType.GET_ALL_SUCCESS:
            return {
                ...state,
                templates: action.templates
            };

        case MemeTemplateActionType.GET_ALL_ERROR:
            return {
                ...state,
                templates: []
            };

        default:
            return state;
    }
};