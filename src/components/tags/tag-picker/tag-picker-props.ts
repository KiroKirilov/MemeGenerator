import { Tag } from "../../../models/memes/tag";
import { SelectValue } from "antd/lib/select";

export type TagPickerProps = {
    onChange<SelectValue>(value: SelectValue, option: React.ReactElement<any> | React.ReactElement<any>[], allTags: Tag[]): void;
    help?: React.ReactNode;
    validateStatus?: "" | "error" | "success" | "warning" | "validating" | undefined;
    placeholder?: string;
};