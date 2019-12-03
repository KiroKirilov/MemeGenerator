import { Tag } from "../../../models/memes/tag";

export type MemeHeaderProps = {
    title: string,
    tags: Tag[],
    userPath: string
};