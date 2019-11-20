import * as React from 'react';
import { memo } from 'react';
import { PageHeaderProps } from './page-header-props';
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { BootstrapHelpers } from '../../../common/helpers/bootstrap-helpers';
import { StringHelpers } from '../../../helpers/string-helpers';
import { default as classes } from "./page-header.module.scss";

export const PageHeader: React.FC<PageHeaderProps> = memo((props: PageHeaderProps) => {
    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
            <div className={BootstrapHelpers.formFieldClasses}>
                <div className={classes.pageHeaderText}>{props.text}</div>
            </div>
        </div>
    );
});
