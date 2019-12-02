import * as React from "react";
import { memo, useEffect, useState } from "react";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { Meme } from "../../../models/memes/meme";
import { collectionNames } from "../../../common/constants/collection-names";
import { useFirestoreConnect, useFirestore, useFirebase } from "react-redux-firebase";
import { Meme as MemeComponent } from "../meme/meme";
import { default as classes } from "./meme-list.module.scss";
import InfiniteScroll from "react-infinite-scroller";
import { QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore-types";

export const MemeList: React.FC = memo(() => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
    const fetching: boolean = !memes;
    const listContainer = React.createRef<HTMLDivElement>();
    const firestore = useFirestore();

    useEffect(() => {
        loadInitial();
    }, []);

    function updateMemes(querySnapshot: QuerySnapshot) {
        const queryMemes: Meme[] = [];

        querySnapshot.forEach((item) => {
            queryMemes.push(item.data() as any);
        });

        const newLastVisible: QueryDocumentSnapshot = querySnapshot.docs[querySnapshot.docs.length - 1];
        setMemes([...memes, ...queryMemes]);
        setLastVisible(newLastVisible);
    }

    async function loadInitial() {
        const querySnapshot = await firestore
            .collection(collectionNames.memes)
            .orderBy("createdOn", "desc")
            .limit(3)
            .get();

        updateMemes(querySnapshot);
    }

    async function loadPage() {
        if (lastVisible) {
            const querySnapshot = await firestore
                .collection(collectionNames.memes)
                .orderBy("createdOn", "desc")
                .startAfter(lastVisible as any)
                .limit(3)
                .get();

            updateMemes(querySnapshot);
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
                        loadMore={(page) => loadPage()}>
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
