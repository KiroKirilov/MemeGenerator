import * as React from "react";
import { memo, useEffect, useState } from "react";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { Meme } from "../../../models/memes/meme";
import { collectionNames } from "../../../common/constants/collection-names";
import { useFirestore, ExtendedFirestoreInstance } from "react-redux-firebase";
import { Meme as MemeComponent } from "../meme/meme";
import { default as classes } from "./meme-list.module.scss";
import InfiniteScroll from "react-infinite-scroller";
import { QueryDocumentSnapshot, QuerySnapshot, Query } from "@firebase/firestore-types";
import { SortType } from "../../../models/meme-operations/sort-type";
import { defaultValues } from "../../../common/constants/default-values";
import { MemeListLoader } from "../meme-list-loader/meme-list-loader";
import { Tag } from "../../../models/memes/tag";

export const MemeList: React.FC = memo(() => {
    const [memes, setMemes] = useState<Meme[] | null>(null);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const sortType: SortType = useSelector((store: ReduxStore) => store.memeOperations.sortType);
    const filterTags: Tag[] = useSelector((store: ReduxStore) => store.memeOperations.tagFilters);
    const fetching: boolean = !memes;
    const listContainer: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const firestore: ExtendedFirestoreInstance = useFirestore();

    useEffect(() => {
        loadInitial();
    }, [sortType, filterTags]);

    function updateMemes(querySnapshot: QuerySnapshot, clearPrev: boolean = false): void {
        const queryMemes: Meme[] = [];

        querySnapshot.forEach((item) => {
            queryMemes.push({
                id: item.id,
                ...item.data() as any
            });
        });

        const newLastVisible: QueryDocumentSnapshot = querySnapshot.docs[querySnapshot.docs.length - 1];
        let newMemes: Meme[] = [];
        if (clearPrev) {
            newMemes = [...queryMemes];
        } else {
            const currentMemes: Meme[] = memes || [];
            newMemes = [...currentMemes];
            const memeIds: (string | undefined)[] = currentMemes.map(m => m.id);

            for (const queryMeme of queryMemes) {
                if (memeIds.indexOf(queryMeme.id) < 0) {
                    newMemes.push(queryMeme);
                }
            }
        }

        if (sortType === SortType.Hot) {
            newMemes = newMemes.sort((a: Meme, b: Meme) => b.score - a.score);
        }

        setMemes(newMemes);
        setLastVisible(newLastVisible);
    }

    async function loadInitial(): Promise<void> {
        const querySnapshot: QuerySnapshot = await getBaseQuery()
            .limit(defaultValues.memesPerLoad)
            .get();

        updateMemes(querySnapshot, true);
    }

    async function loadPage(): Promise<void> {
        if (lastVisible) {
            const querySnapshot: QuerySnapshot = await getBaseQuery()
                .startAfter(lastVisible as any)
                .limit(defaultValues.memesPerLoad)
                .get();

            updateMemes(querySnapshot);
        }
    }

    function getBaseQuery(): Query {
        let baseQuery: Query = firestore
            .collection(collectionNames.memes);

        if (filterTags && filterTags.length > 0) {
            const tagNames = filterTags.map(t => t.name);
            baseQuery = baseQuery.where("tags", "array-contains-any" as any, tagNames);
        }

        const newQuery: Query = baseQuery
            .orderBy("createdOn", "desc");

        const allTimeBestQuery: Query = baseQuery
            .orderBy("score", "desc");

        const queryDate: Date = new Date();
        const currentHours: number = queryDate.getHours();
        queryDate.setHours(currentHours - 24);

        const hotQuery: Query = baseQuery
            .orderBy("createdOn")
            .where("createdOn", ">", queryDate);

        switch (sortType) {
            case SortType.New:
                return newQuery;

            case SortType.Hot:
                return hotQuery;

            case SortType.AllTimeBest:
                return allTimeBestQuery;

            default:
                return hotQuery;
        }
    }

    return (
        <div ref={listContainer} className={classes.memeList}>

            {
                fetching
                    ? <div className={classes.memeContainer}>
                        <MemeListLoader />
                    </div>
                    : <InfiniteScroll
                        hasMore={true}
                        getScrollParent={() => listContainer.current}
                        pageStart={0}
                        useWindow={false}
                        threshold={800}
                        initialLoad={false}
                        loadMore={() => loadPage()}>
                        {
                            (memes || []).map((meme: Meme) => (
                                <div key={meme.id} className={classes.memeContainer}>
                                    <MemeComponent meme={meme} />
                                </div>))
                        }
                    </InfiniteScroll>
            }
        </div>
    );
});
