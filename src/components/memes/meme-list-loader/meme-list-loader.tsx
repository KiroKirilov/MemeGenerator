import * as React from "react";
import { memo } from "react";
import { NumberHelpers } from "../../../common/helpers/number-helpers";
import { MemeLoader } from "../meme-loader/meme-loader";
import classes from "./meme-list-loader.module.scss";

export const MemeListLoader: React.FC = memo(() => {
    return (
        <div>
            {
                [...Array(NumberHelpers.getRandomInt(3, 7))].map(() => (
                    <div className={classes.memeLoaderContainer}>
                        <MemeLoader />
                    </div>
                ))
            }
        </div>
    );
});
