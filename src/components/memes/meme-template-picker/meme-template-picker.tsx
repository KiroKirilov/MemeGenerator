import * as React from "react";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { Card, Alert } from "antd";
import Meta from "antd/lib/card/Meta";
import { MemeTemplate } from "../../../models/memes/meme-template";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-template-picker.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import Search from "antd/lib/input/Search";
import DebouncePromise from "awesome-debounce-promise";
import { MemeTemplateLoader } from "../meme-template-loader/meme-template-loader";
import { NumberHelpers } from "../../../common/helpers/number-helpers";

const delayBeforeUpdate: number = 300;

function updateSearch(newValue: string, setSearchText: React.Dispatch<React.SetStateAction<string>>): void {
    setSearchText(newValue);
}

const deboucedSearchUpdate: (newValue: string, setSearchText: React.Dispatch<React.SetStateAction<string>>) => void
    = DebouncePromise(updateSearch, delayBeforeUpdate);

export const MemeTemplatePicker: React.FC = memo(() => {
    const templates: MemeTemplate[] = useSelector((store: ReduxStore) => store.memeTemplates.templates);
    const hasErrored: boolean = useSelector((store: ReduxStore) => store.memeTemplates.hasErrored);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.memeTemplates.isLoading);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState<string>("");

    function templateFilter(memeTemplate: MemeTemplate): boolean {
        if (!searchText) {
            return true;
        }

        return memeTemplate.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    }

    const filteredTemplates: MemeTemplate[] = templates.filter((t) => templateFilter(t));

    if (isLoading) {
        return (
            <div>
                {
                    [...Array(NumberHelpers.getRandomInt(5, 10))].map(() => (
                        <div className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeTemplateCardRow)}>
                            <MemeTemplateLoader />
                        </div>
                    ))
                }
            </div>
        )
    }

    if (hasErrored) {
        return (
            <div>
                (<div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col12}>
                        <Alert
                            message={"We couldn't load the popular templates :/"}
                            type="error"
                            showIcon
                        />
                    </div>
                </div>)
            </div>
        )
    }

    return (
        <div>
            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeTemplateCardRow)}>
                    <Search
                        placeholder="Search for a template"
                        onChange={e => deboucedSearchUpdate(e.target.value, setSearchText)} />
                </div>
            </div>
            <div className={bootstrap.row}>
                {
                    filteredTemplates.map((t) => (
                        <div key={t.url} className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeTemplateCardRow)}>
                            <Card
                                onClick={() => dispatch(MemeUploadActions.memeUploaded(t.url))}
                                className={classes.memeTemplateCard}
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
