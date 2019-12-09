import * as React from "react";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFirestore } from "react-redux-firebase";
import { collectionNames } from "../../../common/constants/collection-names";
import { UserMetadata } from "../../../models/user/user-metadata";
import { MemeList } from "../../memes/meme-list/meme-list";
import { MemeOperations } from "../../memes/meme-operations/meme-operations";
import { MemeViewer } from "../../memes/meme-viewer/meme-viewer";
import Title from "antd/lib/typography/Title";
import Avatar from "react-avatar";
import { UserAvatar } from "../user-avatar/user-avatar";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { ImageUploader } from "../../misc/image-uploader/image-uploader";
import classes from "./user-profile.module.scss";
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import StickyBox from "react-sticky-box";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { UserProfileActions } from "../../../store/actions/user-profile-actions";

export const UserProfile: React.FC = memo(() => {
    const { userId } = useParams();
    const user: UserMetadata | undefined = useSelector((store: ReduxStore) => store.userProfile.userMetadata);
    const currentUserId: string = useSelector((store: ReduxStore) => store.firebase.auth.uid);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.userProfile.userProfileLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(UserProfileActions.userProfileLoaded(userId || ""));

        return () => {
            dispatch(UserProfileActions.resetState());
        }
    }, [userId]);

    return (
        <div>
            {
                user
                    ? <div>
                        <div className={bootstrap.containerFluid}>
                            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.alignItemsStart)}>

                                <div className={StringHelpers.joinClassNames(
                                    classes.filtersSidebar,
                                    bootstrap.colXl4,
                                    bootstrap.colLg4,
                                    bootstrap.colMd6,
                                    bootstrap.colSm12,
                                    bootstrap.justifyContentCenter,
                                    bootstrap.alignItemsStart,
                                    bootstrap.flexColumn,
                                    bootstrap.dFlex)}>

                                    <div className={classes.profileHeader}>
                                        <Title className={StringHelpers.joinClassNames(
                                            classes.profileHeader,
                                            currentUserId !== user.id ? bootstrap.alignItemsCenter : ""
                                        )}>
                                            <UserAvatar
                                                userId={user.id}
                                                avatarUrl={user.avatarUrl}
                                                username={user.username} />
                                            <span><b>{user.username}</b>'s profile</span>
                                        </Title>
                                    </div>

                                    <MemeOperations />
                                </div>


                                <div className={StringHelpers.joinClassNames(
                                    classes.memeListWrapper,
                                    bootstrap.colXl4,
                                    bootstrap.colLg4,
                                    bootstrap.colMd6,
                                    bootstrap.colSm12,
                                    bootstrap.justifyContentCenter,
                                    bootstrap.dFlex)}>
                                    <MemeList userId={user.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
});