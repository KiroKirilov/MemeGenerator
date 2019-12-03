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

export const MemeList: React.FC = memo(() => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const sortType: SortType = useSelector((store: ReduxStore) => store.memeOperations.sortType);
    const fetching: boolean = !memes;
    const listContainer: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const firestore: ExtendedFirestoreInstance = useFirestore();

    useEffect(() => {
        loadInitial();
    }, []);

    function updateMemes(querySnapshot: QuerySnapshot): void {
        const queryMemes: Meme[] = [];

        querySnapshot.forEach((item) => {
            queryMemes.push({
                id: item.id,
                ...item.data() as any
            });
        });

        const newLastVisible: QueryDocumentSnapshot = querySnapshot.docs[querySnapshot.docs.length - 1];
        setMemes([...memes, ...queryMemes]);
        setLastVisible(newLastVisible);
    }

    async function loadInitial(): Promise<void> {
        const querySnapshot: QuerySnapshot = await getBaseQuery()
            .limit(3)
            .get();

        updateMemes(querySnapshot);
    }

    async function loadPage(): Promise<void> {
        if (lastVisible) {
            const querySnapshot: QuerySnapshot = await getBaseQuery()
                .startAfter(lastVisible as any)
                .limit(3)
                .get();

            updateMemes(querySnapshot);
        }
    }

    function getBaseQuery(): Query {
        const query: Query = firestore
        .collection(collectionNames.memes)
        .orderBy("createdOn", "desc");

        // TODO: use different queries for hot, all time and default!!!
        switch (sortType) {
            case SortType.New:
                return query;

            case SortType.Hot:
                return query;

            case SortType.AllTimeBest:
                return query;

            default:
                return query;
        }
    }

    return (
        <div ref={listContainer} className={classes.memeList}>
            {
                fetching
                    ? <h1>Loading</h1>
                    : <InfiniteScroll
                        hasMore={true}
                        getScrollParent={() => listContainer.current}
                        pageStart={0}
                        useWindow={false}
                        threshold={400}
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
