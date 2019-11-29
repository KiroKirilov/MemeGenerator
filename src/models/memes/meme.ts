import { MemeMetadata } from "./meme-metadata";

export type Meme = MemeMetadata & {
    id?: string;
    createdBy: any,
    createdOn: Date,
    imageUrl: string
};