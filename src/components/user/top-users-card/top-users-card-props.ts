import { TopUserModel } from "../../../models/user/top-user-model";

export type TopUsersCardProps = {
    title: string;
    syncing?: boolean;
    onSync?: () => void;
    topUsers: TopUserModel[];
};