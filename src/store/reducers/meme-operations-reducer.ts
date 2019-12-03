import { MemeOperationsStore } from "../../types/redux-store";
import { SortType } from "../../models/meme-operations/sort-type";
import { MemeOperationsActionPayload } from "../action-types/meme-operations/meme-operations-payload";
import { MemeOperationActionType } from "../action-types/meme-operations/meme-operations-action-type";

const initialState: MemeOperationsStore = {
    sortType: SortType.Hot
};

export const memeOperationsReducer: any = (state: MemeOperationsStore = initialState, action: MemeOperationsActionPayload): MemeOperationsStore => {
    switch (action.type) {
        case(MemeOperationActionType.SORT_UPDATED):
            return {
                ...state,
                sortType: action.sortType
            };

        default:
            return state;
    }
};