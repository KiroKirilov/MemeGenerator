import * as React from "react";
import { memo, useState, useEffect } from "react";
import { Rating } from "../../../models/memes/rating";
import { ImageHelpers } from "../../../common/helpers/image-helpers";
import download from "downloadjs";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { MemeFooterProps } from "./meme-footer-props";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector, useDispatch } from "react-redux";
import { notification, Icon, Tooltip, Popconfirm } from "antd";
import { appRoutes } from "../../../common/constants/app-routes";
import { generatePath } from "react-router-dom";
import { RatingType } from "../../../models/memes/rating-type";
import { default as classes } from "./meme-footer.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import firebase from "../../../config/firebase.config";
import { MemeDeleteActions } from "../../../store/actions/meme-delete-actions";

export const MemeFooter: React.FC<MemeFooterProps> = memo((props: MemeFooterProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const deletionError: boolean = useSelector((store: ReduxStore) => store.memeDelete.memeDeleteError);
    const isAuthenticated: boolean = !auth.isEmpty;
    const [memeRatings, setMemeRatings] = useState<Rating[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.meme.ratings) {
            setMemeRatings(props.meme.ratings);
        }
    }, []);

    if (deletionError) {
        notification.error({
            message: "Couldn't delete the meme, please try again.",
        });
        dispatch(MemeDeleteActions.errorHandled());
    }

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
                message: "Couldn't copy url, please try again.",
            });
        }
    }

    function openDetailsInNewTab(): void {
        const detailsPath: string = generatePath(appRoutes.memes.details, { memeId: props.meme.id });
        const detailsUrl: string = `${window.location.protocol + "//" + window.location.host}${detailsPath}`;
        window.open(detailsUrl, "_blank");
    }

    function deleteMeme(): void {
        dispatch(MemeDeleteActions.memeDeleted(props.meme));
    }

    async function rateMeme(ratingType: RatingType): Promise<void> {
        const oldRatings: Rating[] = [...memeRatings];
        try {
            const updatedRatings: Rating[] = getNewRatings(ratingType);
            setMemeRatings(updatedRatings);

            const newRatingType: RatingType = getNewRatingType(ratingType);
            const params: any = {
                memeId: props.meme.id,
                ratingType: newRatingType
            };
            const callable: firebase.functions.HttpsCallable = firebase.functions().httpsCallable("rateMeme");
            await callable(params);
        } catch (error) {
            setMemeRatings(oldRatings);
            notification.error({
                message: "Couldn't submit your rating, please try again."
            });
        }
    }

    function getNewRatingType(ratingType: RatingType): RatingType {
        let newRatingType: RatingType;
        const currentRating: Rating = memeRatings.filter((r) => r.userId === auth.uid)[0];
        if (!currentRating) {
            newRatingType = ratingType;
        } else if (currentRating.ratingType === ratingType) {
            newRatingType = RatingType.Neutral;
        } else {
            newRatingType = ratingType;
        }

        return newRatingType;
    }

    function getNewRatings(ratingType: RatingType): Rating[] {
        if (memeRatings) {
            let newRatingType: RatingType = getNewRatingType(ratingType);
            const otherRatings: Rating[] = memeRatings.filter((r) => r.userId !== auth.uid);

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
    if (memeRatings && memeRatings.length > 0) {
        score = memeRatings.map(r => r.ratingType).reduce((a, b) => (a as number) + (b as number));
    }

    const currentUserRating: Rating = (memeRatings || []).filter(r => r.userId === auth.uid)[0];
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
                {
                    auth.uid === props.meme.createdBy.id
                        ? <Popconfirm
                            title=""
                            icon={null}
                            okText="Yeet it"
                            cancelText="Keep it"
                            okButtonProps={{
                                type: "danger",
                                icon: "delete",
                                className: classes.deletePopoverButton
                            }}
                            cancelButtonProps={{
                                type: "default",
                                icon: "stop",
                                className: classes.deletePopoverButton
                            }}

                            onConfirm={deleteMeme}

                        >
                            <Icon style={{ color: "red", marginLeft: "10px" }} className={classes.actionIcon} type="delete" />
                        </Popconfirm>
                        : null
                }

                <Tooltip title="Download a copy of this meme">
                    <Icon onClick={downloadMeme} className={classes.actionIcon} type="download" />
                </Tooltip>

                <Tooltip title="Copy url for sharing">
                    <Icon
                        onClick={copyShareUrl}
                        className={StringHelpers.joinClassNames(classes.actionIcon, classes.copyIcon)}
                        type="copy" />
                </Tooltip>

                <Tooltip title="View details in new tab">
                    <Icon
                        onClick={openDetailsInNewTab}
                        className={StringHelpers.joinClassNames(classes.actionIcon, classes.copyIcon)}
                        type="monitor" />
                </Tooltip>
            </div>
        </div>
    );
});
