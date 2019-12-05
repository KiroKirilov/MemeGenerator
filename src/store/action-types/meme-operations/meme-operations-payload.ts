import { MemeOperationActionType } from "./meme-operations-action-type";
import { SortType } from "../../../models/meme-operations/sort-type";
import { Tag } from "../../../models/memes/tag";

export type MemeOperationsActionPayload = {
    type: MemeOperationActionType;
    sortType?: SortType;
    tagFilters?: Tag[];
};