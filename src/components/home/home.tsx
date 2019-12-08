import * as React from "react";
import { memo } from "react";
import { MemeList } from "../memes/meme-list/meme-list";
import { default as bootstrap } from "../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../common/helpers/string-helpers";
import StickyBox from "react-sticky-box";
import { default as classes } from "./home.module.scss";
import { MemeOperations } from "../memes/meme-operations/meme-operations";

export const Home: React.FC = memo(() => {
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
                    <MemeList />
                </div>
            </div>
        </div>
    );
});
