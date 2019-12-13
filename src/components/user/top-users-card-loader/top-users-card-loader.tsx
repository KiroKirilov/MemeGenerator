import * as React from "react";
import { memo } from "react";
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import classes from "./top-users-card-loader.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import Skeleton from "react-skeleton-loader";
import { NumberHelpers } from "../../../common/helpers/number-helpers";

export const TopUsersCardLoader: React.FC = memo(() => {
    return (
        <div className={StringHelpers.joinClassNames(bootstrap.containerFluid, classes.memeTemplateLoaderContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, classes.titleLoaderRow, classes.loaderRow)}>
                <div className={StringHelpers.joinClassNames(bootstrap.col11, classes.titleLoader)}>
                    <Skeleton width="60%" widthRandomness={0.5} height="30px" />
                </div>
                <div className={StringHelpers.joinClassNames(bootstrap.col1, classes.titleLoader)}>
                    <Skeleton width="30px" borderRadius="50%" widthRandomness={0} height="30px" />
                </div>
            </div>

            {
                [...Array(NumberHelpers.getRandomInt(3, 5))].map((_item, index) => (
                    <div key={index} className={StringHelpers.joinClassNames(bootstrap.row, classes.userRowLoader, classes.loaderRow)}>
                        <div className={StringHelpers.joinClassNames(bootstrap.col10, classes.titleLoader)}>
                            <Skeleton color="#A1D2FF" width="60%" widthRandomness={0.5} height="15px" />
                        </div>
                        <div className={StringHelpers.joinClassNames(bootstrap.col2, classes.titleLoader)}>
                            <Skeleton color="#828282" width="60px" widthRandomness={0} height="15px" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
});
