import * as React from "react";
import { FormErrorMessageProps } from "./form-error-message-props";
import { Alert } from "antd";
import { default as classes } from "./form-error-message.module.scss";
import { memo } from "react";

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
