import { MemeMetadata } from "./meme-metadata";
import { Rating } from "./rating";
import { FirebaseDate } from "../../types/firebase-date";

export type Meme = MemeMetadata & {
    id?: string;
    createdBy: any,
    createdOn: FirebaseDate | Date,
    imageUrl: string,
    ratings?: Rating[],
    score: number
};