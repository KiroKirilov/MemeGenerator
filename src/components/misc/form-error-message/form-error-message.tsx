import * as React from "react";
import { FormErrorMessageProps } from "./form-error-message-props";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { Alert } from "antd";
import { default as classes } from "./form-error-message.module.scss";
import { memo } from "react";
import { BootstrapHelpers } from "../../../common/helpers/bootstrap-helpers";

export const FormErrorMessage: React.FC<FormErrorMessageProps> = memo((props: FormErrorMessageProps) => {
    return (
        <>
            {
                !!props.showErrorMessage
                    ? (
                        <Alert
                            className={classes.loginErrorMessage}
                            message={props.errorMessage}
                            type="error"
                            showIcon
                        />
                    )
                    : null
            }
        </>
    );
});
