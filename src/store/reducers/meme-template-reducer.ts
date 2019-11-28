import { MemeTemplateStore } from "../../types/redux-store";
import { MemeTemplateActionPayload } from "../action-types/meme-template/meme-template-payload";
import { MemeTemplateActionType } from "../action-types/meme-template/meme-template-actions-type";

const initialState: MemeTemplateStore = {
    templates: [],
    hasErrored: false,
    isLoading: false
};

export const memeTemplateReducer: any = (state: MemeTemplateStore = initialState, action: MemeTemplateActionPayload): MemeTemplateStore => {
    switch (action.type) {
        case MemeTemplateActionType.GET_ALL_SUCCESS:
            return {
                ...state,
                templates: action.templates,
                hasErrored: false,
                isLoading: false
            };

        case MemeTemplateActionType.GET_ALL_ERROR:
            return {
                ...state,
                templates: [],
                hasErrored: true,
                isLoading: false
            };

        case MemeTemplateActionType.TEMPLATES_LOADING:
            return {
                ...state,
                isLoading: true
            };

        default:
            return state;
    }
};