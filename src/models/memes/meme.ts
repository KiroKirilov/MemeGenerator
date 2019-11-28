import { MemeMetadata } from "./meme-metadata";

export type Meme = MemeMetadata & {
    createdBy: any,
    createdOn: Date,
    imageUrl: string
};