import { FirebaseDate } from "../../../types/firebase-date";

export type MemeHeaderProps = {
    title: string,
    tags: string[],
    userPath: string,
    createdOn: FirebaseDate
};