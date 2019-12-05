import { MemeOperationsStore } from "../../types/redux-store";
import { SortType } from "../../models/meme-operations/sort-type";
import { MemeOperationsActionPayload } from "../action-types/meme-operations/meme-operations-payload";
import { MemeOperationActionType } from "../action-types/meme-operations/meme-operations-action-type";

const initialState: MemeOperationsStore = {
    sortType: SortType.Hot,
    tagFilters: [],
};

export const memeOperationsReducer: any = (state: MemeOperationsStore = initialState, action: MemeOperationsActionPayload): MemeOperationsStore => {
    switch (action.type) {
        case MemeOperationActionType.SORT_TYPE_CHANGED:
            return {
                ...state,
                sortType: action.sortType || SortType.Hot
            };

        case MemeOperationActionType.TAG_FILTER_CHANGED:
            return {
                ...state,
                tagFilters: action.tagFilters || []
            };

        default:
            return state;
    }
};