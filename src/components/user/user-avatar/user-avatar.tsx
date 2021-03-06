import * as React from "react";
import { memo, useState } from "react";
import { UserAvatarProps } from "./user-avatar-props";
import { ZoomableImage } from "../../misc/zoomable-image/zoomable-image";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, notification, Icon, Tooltip, Button } from "antd";
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
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageUploaderVisible, setImageUploaderVisible] = useState<boolean>(false);
    const isBeingChanged = useSelector((store: ReduxStore) => store.userProfile.avatarChangeLoading);

    const firstLetter = (props.username || "$")[0].toUpperCase();

    if (avatarChangeError) {
        notification.error({
            message: "Couldn't update your avatar, please try again.",
        });
        dispatch(UserProfileActions.errorHandled());
    }

    function handleImageUploaded(b64: string): void {
        setImageUploaderVisible(false);
        dispatch(UserProfileActions.profilePictureChanged(b64, props.userId));
    }

    function handleAvatarRemove(): void {
        dispatch(UserProfileActions.avatarRemoved(props.userId, props.avatarUrl || ""));
    }

    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {
                    (!imageLoaded && !!props.avatarUrl) || isBeingChanged
                        ? <Icon className={classes.loadingIcon} spin type="sync" />
                        : props.hideRemove || !props.avatarUrl || props.userId !== currentUserId
                            ? null
                            : <Tooltip className={!imageLoaded ? bootstrap.dNone : ""} title="Remove avatar">
                                <Icon onClick={handleAvatarRemove} className={classes.removeAvatarIcon} theme="filled" type="close-circle" />
                            </Tooltip>
                }
                {
                    props.avatarUrl
                        ? <ZoomableImage
                            containerClasses={StringHelpers.joinClassNames(
                                !imageLoaded ? bootstrap.dNone : "",
                                classes.otherUserAvatar
                            )}
                            onLoad={() => setImageLoaded(true)}
                            imageClasses={classes.avatarImage}
                            imageStyles={{
                                width: `${props.size || defaultValues.avatarSize}px`,
                                height: `${props.size || defaultValues.avatarSize}px`,
                                ...props.style,
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
                        classes.otherUserAvatar
                    )}>
                    {firstLetter}
                </Avatar>
            </div>

            {
                props.userId === currentUserId && !props.disableChange
                    ? <div>
                        <Tooltip title="Change avatar">
                            <Icon className={classes.editAvatarIcon} onClick={() => setImageUploaderVisible(true)} theme="filled" type="edit" />
                        </Tooltip>
                        <ImageUploader
                            onFileUploaded={handleImageUploaded}
                            onRequestClose={() => setImageUploaderVisible(false)}
                            isOpen={imageUploaderVisible} />
                    </div>
                    : null
            }
        </div>
    );
});