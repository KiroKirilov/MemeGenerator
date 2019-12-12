import { FirebaseDate } from "../../../types/firebase-date";
import { MemeSubmitter } from "../../../models/user/meme-submitter";

export type MemeHeaderProps = {
    title: string,
    tags: string[],
    createdBy: MemeSubmitter,
    createdOn: FirebaseDate
};