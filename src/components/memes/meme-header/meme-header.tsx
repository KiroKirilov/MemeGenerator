import * as React from "react";
import { memo } from "react";
import { MemeHeaderProps } from "./meme-header-props";
import { default as classes } from "./meme-header.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { Tag as TagComponent } from "antd";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { Tag } from "../../../models/memes/tag";

export const MemeHeader: React.FC<MemeHeaderProps> = memo((props: MemeHeaderProps) => {
    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, classes.headerContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <div className={classes.cardTitle}>{props.title}</div>
            </div>

            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <div className={StringHelpers.joinClassNames(classes.tagsContainer, bootstrap.dFlex)}>
                    {
                        props.tags.map((tag: Tag) => (<TagComponent key={tag.id}>{tag.name}</TagComponent>))
                    }
                </div>
            </div>
        </div>
    );
});
