export type UserAvatarProps = {
    style?: React.CSSProperties;
    disableChange?: boolean;
    userId: string
    username: string;
    avatarUrl?: string
    hideRemove?: boolean
    size?: number;
};