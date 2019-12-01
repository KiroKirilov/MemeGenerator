import * as React from "react";
import { memo } from "react";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { Meme } from "../../../models/memes/meme";
import { collectionNames } from "../../../common/constants/collection-names";
import { useFirestoreConnect } from "react-redux-firebase";
import { Meme as MemeComponent } from "../meme/meme";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { default as classes } from "./meme-list.module.scss";


export const MemeList: React.FC = memo(() => {
    const firestore: any = useSelector((store: ReduxStore) => store.firestore);
    const memes: Meme[] = firestore.ordered.memes;
    const fetching: boolean = !memes;

    useFirestoreConnect([
        {
            collection: collectionNames.memes,
            orderBy: ["createdOn", "desc"]
        },
    ]);

    return (
        <div className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeList)}>
            {
                fetching
                    ? <h1>Loading</h1>
                    : memes.map((meme: Meme) => (
                        <div key={meme.id} className={StringHelpers.joinClassNames(bootstrap.col12, classes.memeContainer)}>
                            <MemeComponent meme={meme} />
                        </div>))
            }
        </div>
    );
});
