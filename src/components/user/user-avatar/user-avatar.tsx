import * as React from "react";
import { memo, useState } from "react";
import { UserAvatarProps } from "./user-avatar-props";
import { ZoomableImage } from "../../misc/zoomable-image/zoomable-image";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, notification, Icon, Tooltip } from "antd";
import { ImageUploader } from "../../misc/image-uploader/image-uploader";
import classes from "./user-avatar.module.scss";
import { UserProfileActions } from "../../../store/actions/user-profile-actions";
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { defaultValues } from "../../../common/constants/default-values";

export const UserAvatar: React.FC<UserAvatarProps> = memo((props: UserAvatarProps) => {
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const currentUserId = auth.uid;
    const avatarChangeError = useSelector((store: ReduxStore) => store.userProfile.avatarChangeError);
    const dispatch = useDispatch();
    let [imageLoaded, setImageLoaded] = useState(false);

    const firstLetter = props.username[0].toUpperCase();

    if (avatarChangeError) {
        notification.error({
            message: "Couldn't update your avatar, please try again.",
        });
        dispatch(UserProfileActions.errorHandled());
    }

    function handleImageUploaded(b64: string): void {
        dispatch(UserProfileActions.profilePictureChanged(b64, props.userId));
    }

    function handleAvatarRemove(): void {
        dispatch(UserProfileActions.avatarRemoved(props.userId, props.avatarUrl || ""));
    }

    return (
        <div>
            <div>
                {
                    props.hideRemove || !props.avatarUrl || props.userId !== currentUserId
                        ? null
                        : <Tooltip className={!imageLoaded ? bootstrap.dNone : ""} title="Remove avatar">
                            <Icon onClick={handleAvatarRemove} className={classes.removeAvatarIcon} type="close-circle" />
                        </Tooltip>
                }
                {
                    props.avatarUrl
                        ? <ZoomableImage
                            containerClasses={StringHelpers.joinClassNames(
                                !imageLoaded ? bootstrap.dNone : "",
                                props.userId !== currentUserId ? classes.otherUserAvatar : ""
                            )}
                            onLoad={() => setImageLoaded(true)}
                            imageClasses={classes.avatarImage}
                            imageStyles={{
                                width: `${props.size || defaultValues.avatarSize}px`,
                                height: `${props.size || defaultValues.avatarSize}px`
                            }}
                            imageSrc={props.avatarUrl}
                            alt="user avatar" />
                        : null
                }

                <Avatar size={props.size || defaultValues.avatarSize} style={{
                    ...props.style,
                    overflow: "visible",
                }}
                className={StringHelpers.joinClassNames(
                    imageLoaded && props.avatarUrl ? bootstrap.dNone : "",
                    props.userId !== currentUserId ? classes.otherUserAvatar : ""
                )}>
                    {firstLetter}
                </Avatar>
            </div>

            {
                props.userId === currentUserId && !props.disableChange
                    ? <ImageUploader
                        onFileUploaded={handleImageUploaded}
                        buttonClasses={classes.openUploadDialogButton}
                        buttonType="default"
                        buttonIcon="edit"
                        buttonText="Change" />
                    : null
            }
        </div>
    );
});
