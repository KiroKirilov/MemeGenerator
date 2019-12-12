import { Rating } from "./rating";

export type GroupableMeme = {
    creatorUsername: string,
    creatorId: string,
    score: number,
    ratings: Rating[],
    createdOn: Date
}