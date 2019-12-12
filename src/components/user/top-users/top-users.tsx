import * as React from "react";
import { memo, useState, useEffect } from "react";
import { TopUsersCard } from "../top-users-card/top-users-card";
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import classes from "./top-users.module.scss";
import { useFirestore, ExtendedFirestoreInstance } from "react-redux-firebase";
import { collectionNames } from "../../../common/constants/collection-names";
import { Meme } from "../../../models/memes/meme";
import { QuerySnapshot } from "@firebase/firestore-types";
import { CacheHelpers } from "../../../common/helpers/cache-helpers";
import { cacheConstants } from "../../../common/constants/cache-constants";
import { ArrayHelpers } from "../../../common/helpers/array-helpers";

export const TopUsers: React.FC = memo(() => {
    const [memes, setMemes] = useState<Meme[] | null>(null);
    const loading = !memes;
    const [syncing, setSyncing] = useState(true);
    const firestore: ExtendedFirestoreInstance = useFirestore();

    useEffect(() => {
        loadAllMemes(false);
    }, []);

    async function loadAllMemes(forceUpdate: boolean): Promise<void> {
        const memes: Meme[] = await CacheHelpers.getFromCacheOrSet(
            cacheConstants.cacheKeys.allMemesForTopUsers,
            cacheConstants.halfDayExpiration,
            () => getAllMemes(),
            forceUpdate);

        const groupedMemes = ArrayHelpers.groupBy(memes, "createdBy");
        console.log(groupedMemes);

        setSyncing(false);
        setMemes(memes);
    }

    async function getAllMemes(): Promise<Meme[]> {
        const memesRef: QuerySnapshot = await firestore.collection(collectionNames.memes).get();
        const memes: Meme[] = [];
        memesRef.forEach((ref) => {
            const data: any = ref.data();
            memes.push({
                id: ref.id,
                createdBy: data.createdBy.id,
                createdOn: data.createdOn,
                imageUrl: data.imageUrl,
                ratings: data.ratings,
                score: data.score,
                storageLocation: data.storageLocation,
                title: data.title,
                tags: data.tags
            });
        });

        return memes;
    }

    async function handleSync(): Promise<void> {
        setSyncing(true);
        loadAllMemes(true);
    }

    return (
        <div className={bootstrap.col12}>
            <div className={classes.topUsersCardWrapper}>
                <TopUsersCard syncing={syncing} onSync={() => handleSync()} title="Today's top users" />
            </div>
            <div className={classes.topUsersCardWrapper}>
                <TopUsersCard syncing={syncing} onSync={() => handleSync()} title="All time top users" />
            </div>
        </div>
    );
});
