import * as React from "react";
import { memo } from "react";
import { Card, Icon } from "antd";
import { TopUsersCardProps } from "./top-users-card-props";

export const TopUsersCard: React.FC<TopUsersCardProps> = memo((props: TopUsersCardProps) => {
    console.log(props.syncing);
    return (
        <Card size="small" title={props.title} extra={<Icon type="sync" onClick={props.onSync} spin={props.syncing} />}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    );
});
