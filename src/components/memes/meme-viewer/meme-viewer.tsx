import * as React from "react";
import { memo } from "react";
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import classes from "./meme-viewer.module.scss";
import StickyBox from "react-sticky-box";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { MemeOperations } from "../meme-operations/meme-operations";
import { MemeList } from "../meme-list/meme-list";
import { MemeViewerProps } from "./meme-viewer-props";

export const MemeViewer: React.FC<MemeViewerProps> = memo((props: MemeViewerProps) => {
    return (
        <div className={bootstrap.containerFluid}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.alignItemsStart)}>

                <StickyBox className={StringHelpers.joinClassNames(
                    classes.filtersSidebar,
                    bootstrap.colXl4,
                    bootstrap.colLg4,
                    bootstrap.colMd6,
                    bootstrap.colSm12,
                    bootstrap.justifyContentCenter,
                    bootstrap.alignItemsStart,
                    bootstrap.dFlex)} offsetTop={20} offsetBottom={20}>
                    <MemeOperations />
                </StickyBox>


                <div className={StringHelpers.joinClassNames(
                    classes.memeListWrapper,
                    bootstrap.colXl4,
                    bootstrap.colLg4,
                    bootstrap.colMd6,
                    bootstrap.colSm12,
                    bootstrap.justifyContentCenter,
                    bootstrap.dFlex)}>
                    <MemeList userId={props.userId} />
                </div>
            </div>
        </div>
    );
});
