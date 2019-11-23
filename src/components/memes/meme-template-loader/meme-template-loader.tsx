import * as React from 'react';
import { memo } from 'react';
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-template-loader.module.scss";
import { StringHelpers } from '../../../helpers/string-helpers';
import Skeleton from 'react-skeleton-loader';

export const MemeTemplateLoader: React.FC = memo(() => {
    return (
        <div className={StringHelpers.joinClassNames(bootstrap.containerFluid, classes.memeTemplateLoaderContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, classes.imageLoaderRow, classes.loaderRow)}>
                <Skeleton width="100%" widthRandomness={0} height="230px" />
            </div>

            <div className={StringHelpers.joinClassNames(bootstrap.row, classes.titleLoaderRow, classes.loaderRow)}>
                <Skeleton width="100%" widthRandomness={0} height="50px" />
            </div>
        </div>
    );
});
