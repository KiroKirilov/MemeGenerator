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
import { GroupableMeme } from "../../../models/memes/groupable-meme";
import { FirebaseDate } from "../../../types/firebase-date";
import { DateHelpers } from "../../../common/helpers/date-helpers";
import { TopUserModel } from "../../../models/user/top-user-model";
import { defaultValues } from "../../../common/constants/default-values";
import { RatingType } from "../../../models/memes/rating-type";
import { Rating } from "../../../models/memes/rating";
import { TopUsersCardLoader } from "../top-users-card-loader/top-users-card-loader";

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

        setSyncing(false);
        setMemes(memes);
    }

    function transformMemes(memes: Meme[]): TopUserModel[] {
        const groupableMemes: GroupableMeme[] = memes
            .filter(m => m.ratings && m.ratings.length > 0)
            .map(m => ({
                creatorUsername: m.createdBy.username,
                creatorId: m.createdBy.id,
                score: m.score,
                ratings: m.ratings || [],
                createdOn: DateHelpers.fbDateToDate(m.createdOn as FirebaseDate)
            }));
        const groupedMemes = ArrayHelpers.groupBy(groupableMemes, "creatorId");
        const models: TopUserModel[] = [];
        for (const userId in groupedMemes) {
            if (groupedMemes.hasOwnProperty(userId)) {
                const userMemes: GroupableMeme[] = groupedMemes[userId];
                if (userMemes.length > 0) {
                    const username: string = userMemes[0].creatorUsername;
                    const totalScore: number = userMemes.map(m => m.score).reduce((a, b) => a + b);
                    const userRatings: Rating[] = userMemes.flatMap(m => m.ratings);
                    const upvotesCount: number = userRatings.filter((r) => r.ratingType === RatingType.Positive).length;
                    const downvotesCount: number = userRatings.filter((r) => r.ratingType === RatingType.Negative).length;
                    const total: number = upvotesCount + downvotesCount;
                    const upvotePercentage: number = (upvotesCount / total) * 100;
                    models.push({
                        userId: userId,
                        username: username,
                        totalScore: totalScore,
                        percentUpvoted: upvotePercentage
                    });
                }
            }
        }

        const transformedModels: TopUserModel[] = models
            .sort((a, b) => {
                const scoreSort: number = b.totalScore - a.totalScore;
                if (scoreSort !== 0) {
                    return scoreSort;
                }

                const percentSort: number = b.percentUpvoted - a.percentUpvoted;
                if (scoreSort !== 0) {
                    return percentSort;
                }

                return a.username.localeCompare(b.username);

            })
            .slice(0, defaultValues.topUsersToShow);

        return transformedModels;
    }

    function getMemesFromLast24Hours(memes: Meme[]): Meme[] {
        const startDate: Date = DateHelpers.dateNHoursAgo(24);
        const todayMemes: Meme[] = memes.filter(m => DateHelpers.fbDateToDate(m.createdOn as FirebaseDate) > startDate);
        return todayMemes;
    }

    async function getAllMemes(): Promise<Meme[]> {
        const memesRef: QuerySnapshot = await firestore.collection(collectionNames.memes).get();
        const memes: Meme[] = [];
        memesRef.forEach((ref) => {
            const data: any = ref.data();
            memes.push({
                id: ref.id,
                createdBy: data.createdBy,
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
                {
                    loading
                        ? <TopUsersCardLoader />
                        : <TopUsersCard
                            topUsers={transformMemes(getMemesFromLast24Hours(memes || []))}
                            syncing={syncing}
                            onSync={() => handleSync()}
                            title="Today's top users" />
                }
            </div>

            <div className={classes.topUsersCardWrapper}>
                {
                    loading
                        ? <TopUsersCardLoader />
                        : <TopUsersCard topUsers={transformMemes(memes || [])} syncing={syncing} onSync={() => handleSync()} title="All time top users" />
                }
            </div>
        </div>
    );
});
