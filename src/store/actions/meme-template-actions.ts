import { FunctionAction } from "../../types/function-action";
import { JsonResponse } from "../../types/json-response";
import { MemeTemplate } from "../../models/memes/meme-template";
import { MemeTemplateActionType } from "../action-types/meme-template/meme-template-actions-type";
import { ReduxStore } from "../../types/redux-store";
import { GetState } from "../../types/get-state";

export class MemeTemplateActions {
    public static getPopularTemplates(): FunctionAction {
        return async (dispatch: any, getState: GetState) => {
            try {
                const store: ReduxStore = getState();

                if (store.memeTemplates.templates && store.memeTemplates.templates.length > 0) {
                    dispatch({ type: MemeTemplateActionType.GET_ALL_SUCCESS, templates: store.memeTemplates.templates });
                } else {
                    const response: Response = await fetch("https://api.imgflip.com/get_memes");
                    const templatesResponse: JsonResponse = await response.json();
                    if (templatesResponse.success) {
                        const templates: MemeTemplate[] = templatesResponse.data.memes;
                        dispatch({ type: MemeTemplateActionType.GET_ALL_SUCCESS, templates });
                    }
                }
            } catch (error) {
                dispatch({ type: MemeTemplateActionType.GET_ALL_ERROR });
            }
        };
    }
}