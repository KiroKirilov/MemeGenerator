import * as React from "react";
import { memo } from "react";
import { Card, Icon, Empty, Button, Popover } from "antd";
import { TopUsersCardProps } from "./top-users-card-props";
import { appRoutes } from "../../../common/constants/app-routes";
import { ReduxStore } from "../../../types/redux-store";
import { useSelector } from "react-redux";
import { useHistory, NavLink, generatePath } from "react-router-dom";
import classes from "./top-users-card.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";

export const TopUsersCard: React.FC<TopUsersCardProps> = memo((props: TopUsersCardProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated: boolean = !auth.isEmpty;
    const history = useHistory();

    return (
        <Card className={classes.topUsersCard}
            size="small" title={props.title} extra={<Icon type="sync" onClick={props.onSync} spin={props.syncing} />}>
            {
                props.topUsers && props.topUsers.length > 0
                    ? props.topUsers.map(t =>
                        (<div key={t.userId} className={StringHelpers.joinClassNames(classes.topUserRowAlign, classes.topUserRow)}>
                            <div>
                                <NavLink to={generatePath(appRoutes.user, { userId: t.userId })}>
                                    {t.username}
                                </NavLink>
                            </div>
                            <div>
                                <Popover
                                    content={<span>{t.percentUpvoted.toFixed(0)}<Icon type="percentage" /> upvoted</span>}>
                                    <span style={{ cursor: "pointer" }}>Score: {t.totalScore}</span>
                                </Popover>
                            </div>
                        </div>))
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{
                            marginTop: 5,
                            marginBottom: 10
                        }}
                        description={
                            <span>
                                <span style={{ display: "block", color: "black" }}>
                                    There have been no memes submitted for this time frame.
                                </span>
                                {
                                    isAuthenticated
                                        ? <Button
                                            icon="file-image"
                                            onClick={() => history.push(appRoutes.memes.submit)}
                                            type="primary">
                                            Submit one!
                                        </Button>
                                        : null
                                }
                            </span>
                        } />
            }
        </Card>
    );
});
