import * as React from "react";
import { memo } from "react";
import { Rating } from "../../../models/memes/rating";
import { ImageHelpers } from "../../../common/helpers/image-helpers";
import download from "downloadjs";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { MemeFooterProps } from "./meme-footer-props";
import { ExtendedFirestoreInstance, useFirestore } from "react-redux-firebase";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { notification, Icon, Tooltip } from "antd";
import { appRoutes } from "../../../common/constants/app-routes";
import { generatePath } from "react-router-dom";
import { collectionNames } from "../../../common/constants/collection-names";
import { RatingType } from "../../../models/memes/rating-type";
import { default as classes } from "./meme-footer.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";

export const MemeFooter: React.FC<MemeFooterProps> = memo((props: MemeFooterProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated: boolean = !auth.isEmpty;
    const firestore: ExtendedFirestoreInstance = useFirestore();

    async function downloadMeme(): Promise<void> {
        try {
            const imageB64: string = await ImageHelpers.ensureDataUrl(props.meme.imageUrl);
            download(imageB64, `${StringHelpers.generateGuid()}.${ImageHelpers.getImageExtensionFromDataUrl(imageB64)}`);
        } catch (error) {
            notification.error({
                message: "Couldn't download the image, please try again.",
            });
        }
    }

    async function copyShareUrl(): Promise<void> {
        try {
            const detailsPath: string = generatePath(appRoutes.memes.details, { memeId: props.meme.id });
            const detailsUrl: string = `${window.location.protocol + "//" + window.location.host}${detailsPath}`;
            await navigator.clipboard.writeText(detailsUrl);
            notification.info({
                message: "Copied!",
                duration: 0.5
            });
        } catch (error) {
            notification.error({
                message: "Couldn't copy url, pelase try again.",
            });
        }
    }

    async function rateMeme(ratingType: RatingType): Promise<void> {
        try {
            // TODO: Dispatch an action instead of making a call to direbase
            const updatedRatings: Rating[] = getNewRatings(ratingType);
            await firestore.collection(collectionNames.memes).doc(props.meme.id).update({
                id: props.meme.id,
                ratings: updatedRatings
            });
        } catch (error) {
            notification.error({
                message: "Couldn't submit your rating, please try again."
            });
        }
    }

    function getNewRatings(ratingType: RatingType): Rating[] {
        if (props.meme.ratings) {
            let newRatingType: RatingType;
            const currentRating: Rating = props.meme.ratings.filter((r) => r.userId === auth.uid)[0];
            const otherRatings: Rating[] = props.meme.ratings.filter((r) => r.userId !== auth.uid);
            if (!currentRating) {
                newRatingType = ratingType;
            } else if (currentRating.ratingType === ratingType) {
                newRatingType = RatingType.Neutral;
            } else {
                newRatingType = ratingType;
            }

            return [...otherRatings, {
                userId: auth.uid,
                ratingType: newRatingType
            }];
        } else {
            return [{
                userId: auth.uid,
                ratingType: ratingType
            }];
        }
    }

    let score: number = 0;
    if (props.meme.ratings && props.meme.ratings.length > 0) {
        score = props.meme.ratings.map(r => r.ratingType).reduce((a, b) => (a as number) + (b as number));
    }

    const currentUserRating: Rating = (props.meme.ratings || []).filter(r => r.userId === auth.uid)[0];
    const currentUserRatingType: RatingType = currentUserRating ? currentUserRating.ratingType : RatingType.Neutral;

    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, classes.footerContainer, bootstrap.dFlex, bootstrap.alignItemsCenter)}>
            <div className={StringHelpers.joinClassNames(bootstrap.col6)}>
                {
                    isAuthenticated
                        ? <Icon
                            onClick={() => rateMeme(RatingType.Positive)}
                            type="up-circle"
                            className={StringHelpers.joinClassNames(
                                classes.actionIcon,
                                currentUserRatingType === RatingType.Positive ? classes.activeUpvote : "")} />
                        : null
                }
                <span className={StringHelpers.joinClassNames(classes.actionIcon, classes.score)}>{score}</span>
                {
                    isAuthenticated
                        ? <Icon
                            onClick={() => rateMeme(RatingType.Negative)}
                            type="down-circle"
                            className={StringHelpers.joinClassNames(
                                classes.actionIcon,
                                currentUserRatingType === RatingType.Negative ? classes.activeDownvote : "")} />
                        : null
                }
            </div>

            <div className={StringHelpers.joinClassNames(bootstrap.col6, bootstrap.dFlex, bootstrap.flexRowReverse)}>
                <Icon onClick={downloadMeme} className={classes.actionIcon} type="download" />

                <Tooltip title="Copy url for sharing">
                    <Icon
                        onClick={copyShareUrl}
                        className={StringHelpers.joinClassNames(classes.actionIcon, classes.copyIcon)}
                        type="copy" />
                </Tooltip>
            </div>
        </div>
    );
});
