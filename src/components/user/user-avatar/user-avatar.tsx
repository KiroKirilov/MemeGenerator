import * as React from 'react';
import { memo, useState } from 'react';
import { UserAvatarProps } from './user-avatar-props';
import { ZoomableImage } from '../../misc/zoomable-image/zoomable-image';
import { ReduxStore } from '../../../types/redux-store';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

export const UserAvatar: React.FC<UserAvatarProps> = memo((props: UserAvatarProps) => {
    const firstLetter = props.userMetadata.username[0].toUpperCase();
    return (
        <>
            {
                props.userMetadata.avatarUrl
                    ? <ZoomableImage imageSrc={props.userMetadata.avatarUrl} alt="user avatar" />
                    : <Avatar size={50} style={{
                        ...props.style,
                        overflow: "visible",
                    }}>
                        {firstLetter}
                    </Avatar>
            }
        </>
    );
});
