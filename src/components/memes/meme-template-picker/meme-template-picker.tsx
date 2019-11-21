import * as React from "react";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { MemeTemplate } from "../../../models/memes/meme-template";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-template-picker.module.scss";
import { StringHelpers } from "../../../helpers/string-helpers";
import Search from "antd/lib/input/Search";
import DebouncePromise from "awesome-debounce-promise";

const delayBeforeSearch: number = 300;

function updateSearch(newValue: string, setSearchText: React.Dispatch<React.SetStateAction<string>>) {
    setSearchText(newValue);
}

const deboucedSearchUpdate = DebouncePromise(updateSearch, delayBeforeSearch);

export const MemeTemplatePicker: React.FC = memo(() => {
    const templates: MemeTemplate[] = useSelector((store: ReduxStore) => store.memeTemplates.templates);
    const [searchText, setSearchText] = useState<string>("");

    function templateFilter(memeTemplate: MemeTemplate): boolean {
        if (!searchText) {
            return true;
        }

        return memeTemplate.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    }

    const filteredTemplates: MemeTemplate[] = templates.filter((t) => templateFilter(t));

    return (
        <div>
            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeTemplateCardRow)}>
                    <Search placeholder="Search for a template" onChange={e => deboucedSearchUpdate(e.target.value, setSearchText)} />
                </div>
            </div>
            <div className={bootstrap.row}>
                {
                    filteredTemplates.map((t) => (
                        <div key={t.url} className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeTemplateCardRow)}>
                            <Card
                                hoverable
                                cover={<img alt="example" src={t.url} />}
                            >
                                <Meta title={t.name} />
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
});
