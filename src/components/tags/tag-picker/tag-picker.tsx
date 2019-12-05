import * as React from "react";
import { memo, useEffect } from "react";
import { Form, Select, Icon, Spin } from "antd";
import { TagPickerProps } from "./tag-picker-props";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { Tag } from "../../../models/memes/tag";
import { collectionNames } from "../../../common/constants/collection-names";
import { useFirestoreConnect } from "react-redux-firebase";
import { htmlElements } from "../../../common/constants/html-elements";

export const TagPicker: React.FC<TagPickerProps> = memo((props: TagPickerProps) => {
    const firestore: any = useSelector((store: ReduxStore) => store.firestore);
    const tags: Tag[] = firestore.ordered.tags;
    const fetching: boolean = firestore.status.requesting.tags;

    useFirestoreConnect([
        {
            collection: collectionNames.tags,
            orderBy: ["name", "asc"]
        },
    ]);

    useEffect(() => {
        const tagsPlaceholder: Element | null = document.querySelector(".ant-select-selection__placeholder");
        if (tagsPlaceholder) {
            tagsPlaceholder.innerHTML = `${htmlElements.tagIcon} ${props.placeholder || "Tags"}`;
        }
    }, []);

    const children: JSX.Element[] = [];
    if (tags) {
        for (const tag of tags) {
            children.push(<Select.Option key={tag.id}><Icon type="tag" /> {tag.name}</Select.Option>);
        }
    }
    return (
        <Form.Item
            validateStatus={props.validateStatus}
            help={props.help}>
            <Select
                notFoundContent={fetching ? <Spin size="small" /> : null}
                mode="multiple"
                style={{ width: "100%" }}
                placeholder={props.placeholder || "Tags"}
                onChange={(value, option) => props.onChange(value, option, tags)}
                optionFilterProp="name"
                filterOption={(value, option) => {
                    if (option.props.children && (option.props.children as string[])[2]) {
                        return (option.props.children as string[])[2].toLowerCase().indexOf(value.trim().toLowerCase()) >= 0;
                    }
                    return false;
                }}
            >
                {children}
            </Select>
        </Form.Item>
    );
});
