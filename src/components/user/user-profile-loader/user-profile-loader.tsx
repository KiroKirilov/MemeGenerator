import * as React from 'react';
import { memo } from 'react';
import Skeleton from 'react-skeleton-loader';
import { StringHelpers } from '../../../common/helpers/string-helpers';
import bootstrap from "../../../common/styles/bootstrapGrid.module.scss";
import classes from "./user-profile-loader.module.scss";

export const UserProfileLoader: React.FC = memo(() => {
    return (
        <div className={bootstrap.containerFluid}>
            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(
                    classes.filtersSidebar,
                    bootstrap.colXl4,
                    bootstrap.colLg4,
                    bootstrap.colMd12,
                    bootstrap.colSm12,
                    bootstrap.justifyContentCenter,
                    bootstrap.alignItemsStart,
                    bootstrap.flexColumn,
                    bootstrap.dFlex)}>
                    <div className={StringHelpers.joinClassNames(classes.profileLoaderRow, classes.loaderRow)}>
                        <div style={{ marginLeft: "-11px" }} className={StringHelpers.joinClassNames(bootstrap.col1, classes.profileLoader)}>
                            <Skeleton width="50px" borderRadius="50%" widthRandomness={0} height="50px" />
                        </div>

                        <div style={{ marginLeft: "22px" }} className={StringHelpers.joinClassNames(bootstrap.col5, classes.profileLoader)}>
                            <Skeleton width="100%" widthRandomness={0.2} height="50px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
