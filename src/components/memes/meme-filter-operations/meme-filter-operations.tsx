import * as React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { MemeOperationsActions } from "../../../store/actions/meme-oprations-actions";
import { SelectValue } from "antd/lib/select";
import { TagPicker } from "../../tags/tag-picker/tag-picker";
import { Tag } from "../../../models/memes/tag";

export const MemeFilterOperations: React.FC = memo(() => {
    const dispatch: Dispatch<any> = useDispatch();

    function handleTagsChange(val: SelectValue, tags: Tag[]): void {
        if (val) {
            const selectedTags: Tag[] = tags.filter((tag: Tag) => (val as string[]).indexOf(tag.id) >= 0);
            dispatch(MemeOperationsActions.tagFiltersChanged(selectedTags));
        }
    }

    return (
        <div style={{ width: "60%", margin: "auto" }}>
            <TagPicker
                onChange={(val, _opts, tags) => handleTagsChange(val as any, tags)}
                placeholder="Filter by tags"
            />
        </div>
    );
});
