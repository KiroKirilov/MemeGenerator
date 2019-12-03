import { MemeOperationActionType } from "./meme-operations-action-type";
import { SortType } from "../../../models/meme-operations/sort-type";

export type MemeOperationsActionPayload = {
    type: MemeOperationActionType;
    sortType: SortType
};