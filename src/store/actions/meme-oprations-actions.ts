import { SortType } from "../../models/meme-operations/sort-type";
import { MemeOperationsActionPayload } from "../action-types/meme-operations/meme-operations-payload";
import { MemeOperationActionType } from "../action-types/meme-operations/meme-operations-action-type";
import { Tag } from "../../models/memes/tag";

export class MemeOperationsActions {
    public static sortTypeChanged(sortType: SortType): MemeOperationsActionPayload {
        return { type: MemeOperationActionType.SORT_TYPE_CHANGED, sortType: sortType };
    }

    public static tagFiltersChanged(tagFilters: Tag[]): MemeOperationsActionPayload {
        return { type: MemeOperationActionType.TAG_FILTER_CHANGED, tagFilters: tagFilters };
    }

    public static resetMemeOperations(): MemeOperationsActionPayload {
        return { type: MemeOperationActionType.RESET_MEME_OPERAITONS };
    }
}