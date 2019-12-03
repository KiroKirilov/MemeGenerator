import { SortType } from "../../models/meme-operations/sort-type";
import { MemeOperationsActionPayload } from "../action-types/meme-operations/meme-operations-payload";
import { MemeOperationActionType } from "../action-types/meme-operations/meme-operations-action-type";

export class MemeOperationsActions {
    public static sortTypeChanged(sortType: SortType): MemeOperationsActionPayload {
        return { type: MemeOperationActionType.SORT_UPDATED, sortType: sortType };
    }
}