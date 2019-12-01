import * as React from 'react';
import { memo } from 'react';
import { useParams } from 'react-router';
import { collectionNames } from '../../../common/constants/collection-names';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { ReduxStore } from '../../../types/redux-store';
import { Meme } from '../../../models/memes/meme';
import { Meme as MemeComponent } from '../meme/meme';
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from '../../../common/helpers/string-helpers';
import "./meme-details.scss";
import classes from '*.module.css';

export const MemeDetails: React.FC = memo(() => {
    const { memeId } = useParams();
    const firestore: any = useSelector((store: ReduxStore) => store.firestore);
    const memes: { [key: string]: Meme } = useSelector((store: ReduxStore) => store.firestore.data.memes);
    const loading: boolean = firestore.status.requesting[`${collectionNames.memes}/${memeId}`] !== false;

    useFirestoreConnect([
        {
            collection: collectionNames.memes,
            doc: memeId
        }
    ]);

    return (
        <div className={bootstrap.containerFluid}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                <div className={"detailsWrapper"}>
                    {
                        loading
                            ? <h1>Loading</h1>
                            : <MemeComponent meme={memes[memeId || ""]} />
                    }

                </div>
            </div>
        </div>

    );
});
