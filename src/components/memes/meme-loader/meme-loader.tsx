import * as React from "react";
import { memo } from "react";
import { default as classes } from "./meme-loader.module.scss";
import Skeleton from "react-skeleton-loader";
import { StringHelpers } from "../../../common/helpers/string-helpers";

export const MemeLoader: React.FC = memo(() => {
    return (
        <div className={classes.memeLoaderContainer}>
            <div className={StringHelpers.joinClassNames(classes.loaderRow, classes.imageLoaderRow)}>
                <Skeleton width="100%" widthRandomness={0} height="280px" />
            </div>

            <div className={StringHelpers.joinClassNames(classes.loaderRow, classes.footerLoaderRow)}>
                <Skeleton width="100%" widthRandomness={0.5} height="30px" />
                <Skeleton width="100%" widthRandomness={0.5} height="15px" />

                <div className={classes.tagsLoader}>
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                    <Skeleton width="65px" widthRandomness={0.4} height="15px" />
                </div>

                <div className={classes.iconsLoader}>
                    <div>
                        <Skeleton width="30px" borderRadius="50%" widthRandomness={0} height="30px" />
                        <Skeleton width="20px" widthRandomness={0} height="30px" />
                        <Skeleton width="30px" borderRadius="50%" widthRandomness={0} height="30px" />
                    </div>

                    <div>
                        <Skeleton width="30px" widthRandomness={0} height="30px" />
                        <Skeleton width="30px" widthRandomness={0} height="30px" />
                    </div>
                </div>
            </div>
        </div>
    );
});
