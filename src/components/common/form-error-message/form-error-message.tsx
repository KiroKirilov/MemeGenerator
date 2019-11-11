import * as React from 'react';
import { FormErrorMessageProps } from './form-error-message-props';
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from '../../../helpers/string-helpers';
import { Alert } from 'antd';
import { default as classes } from "./form-error-message.module.scss";

export const FormErrorMessage: React.FC<FormErrorMessageProps> = (props: FormErrorMessageProps) => {
    return (
        <>
            {
                !!props.showErrorMessage
                    ? (
                        <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                            <div className={bootstrap.col3}>
                                <Alert
                                    className={classes.loginErrorMessage}
                                    message={props.errorMessage}
                                    type="error"
                                    showIcon
                                />
                            </div>
                        </div>
                    )
                    : null
            }
        </>
    );
};
