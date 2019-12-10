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
import { Empty, Button } from "antd";
import { useHistory } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import { MemeListProps } from "./meme-list-props";

export const MemeList: React.FC<MemeListProps> = memo((props: MemeListProps) => {
    const [memes, setMemes] = useState<Meme[] | null>(null);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const sortType: SortType = useSelector((store: ReduxStore) => store.memeOperations.sortType);
    const filterTags: Tag[] = useSelector((store: ReduxStore) => store.memeOperations.tagFilters);
    const deletedMemeId: string | undefined = useSelector((store: ReduxStore) => store.memeDelete.deletedMemeId);
    const listContainer: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const firestore: ExtendedFirestoreInstance = useFirestore();
    const history = useHistory();
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated = !auth.isEmpty;

    useEffect(() => {
        loadInitial();
    }, [sortType, filterTags, props.userId, deletedMemeId]);

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
        setIsLoading(false);
    }

    async function loadInitial(): Promise<void> {
        setIsLoading(true);
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
            const tagNames: string[] = filterTags.map(t => t.name);
            baseQuery = baseQuery.where("tags", "array-contains-any" as any, tagNames);
        }

        if (props.userId) {
            const userRef = firestore.collection(collectionNames.userProfiles).doc(props.userId);
            baseQuery = baseQuery.where("createdBy", "==", userRef);
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
                isLoading
                    ? <div className={classes.memeContainer}>
                        <MemeListLoader />
                    </div>
                    : memes && memes.length > 0
                        ? <InfiniteScroll
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
                        : <Empty description={
                            <span>
                                <span style={{ display: "block" }}>There are no memes, which match your filters.</span>
                                {
                                    isAuthenticated
                                        ? <Button
                                            icon="home"
                                            onClick={() => history.push(appRoutes.memes.submit)}
                                            type="primary">
                                            Submit one!
                                </Button>
                                        : null
                                }
                            </span>
                        } />
            }
        </div>
    );
});
