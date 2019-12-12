import { MemeMetadata } from "./meme-metadata";
import { Rating } from "./rating";
import { FirebaseDate } from "../../types/firebase-date";
import { MemeSubmitter } from "../user/meme-submitter";

export type Meme = MemeMetadata & {
    id?: string;
    createdBy: MemeSubmitter,
    createdOn: FirebaseDate | Date,
    imageUrl: string,
    ratings?: Rating[],
    score: number
    storageLocation: string
};