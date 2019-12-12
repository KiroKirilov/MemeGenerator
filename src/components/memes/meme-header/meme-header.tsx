import * as React from "react";
import { memo } from "react";
import { MemeHeaderProps } from "./meme-header-props";
import { default as classes } from "./meme-header.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { Tag as TagComponent, Card } from "antd";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { generatePath, NavLink } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import moment from "moment";
import { DateHelpers } from "../../../common/helpers/date-helpers";

export const MemeHeader: React.FC<MemeHeaderProps> = memo((props: MemeHeaderProps) => {
    const date: Date = DateHelpers.fbDateToDate(props.createdOn)
    const submittedString: string = moment(date).fromNow();

    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, classes.headerContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <Card.Meta title={props.title} />
            </div>

            {
                props.createdBy && props.createdBy.username
                    ? <div className={classes.userProfileLink}>
                        submitted {submittedString} by <NavLink to={generatePath(appRoutes.user, { userId: props.createdBy.id })}>{props.createdBy.username}</NavLink>
                    </div>
                    : null
            }


            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <div className={StringHelpers.joinClassNames(classes.tagsContainer, bootstrap.dFlex)}>
                    {
                        props.tags.map((tag: string) => (<TagComponent key={tag}>{tag}</TagComponent>))
                    }
                </div>
            </div>
        </div>
    );
});
