import { Tag } from "../../../models/memes/tag";
import { FirebaseDate } from "../../../types/firebase-date";

export type MemeHeaderProps = {
    title: string,
    tags: Tag[],
    userPath: string,
    createdOn: FirebaseDate
};