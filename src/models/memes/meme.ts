import { MemeMetadata } from "./meme-metadata";
import { Rating } from "./rating";

export type Meme = MemeMetadata & {
    id?: string;
    createdBy: any,
    createdOn: Date,
    imageUrl: string,
    ratings?: Rating[]
};