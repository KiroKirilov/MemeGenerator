import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Icon, Button, Spin } from "antd";
import { memo } from "react";
import { ReduxStore } from "../../../types/redux-store";
import { FormErrorMessage } from "../../common/form-error-message/form-error-message";
import useForm from "react-hook-form";
import { FormHelpers } from "../../../common/helpers/form-helpers";
import { StringHelpers } from "../../../helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { AuthActions } from "../../../store/actions/auth-actions";
import { AuthActionType } from "../../../store/action-types/auth/auth-actions-type";
import { ValidationHelpers } from "../../../common/helpers/validation-helpers";
import { PageHeader } from "../../common/page-header/page-header";
import { BootstrapHelpers } from "../../../common/helpers/bootstrap-helpers";

export const Register: React.FC = memo(() => {
    const { register, handleSubmit, errors, getValues, setValue, watch } = useForm({
        mode: "onBlur"
    });
    const registerErrorMessage = useSelector((store: ReduxStore) => store.auth.registerError && store.auth.registerError.message);
    const isLoading = useSelector((store: ReduxStore) => store.auth.isLoading);

    const values = getValues();
    const dispatch = useDispatch();

    const fields = {
        email: "email",
        password: "password",
        confirmPassword: "confirmPassword",
        username: "username"
    };

    if (registerErrorMessage && isLoading) {
        dispatch(AuthActions.stopLoading());
    }

    const onSubmit = (data: any) => {
        dispatch(AuthActions.startLoading())
        dispatch(AuthActions.register(data));
    };

    return (
        <Spin spinning={isLoading} delay={100}>
            <form noValidate className={bootstrap.containerFluid} onSubmit={handleSubmit(onSubmit)}>

                <PageHeader text="Register" />

                <FormErrorMessage showErrorMessage={!!registerErrorMessage} errorMessage={registerErrorMessage} />

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={BootstrapHelpers.formFieldClasses}>
                        <Form.Item
                            validateStatus={errors.email && "error"}
                            help={errors.email && errors.email.message}>
                            <Input
                                onChange={(e) => setValue(fields.email, e.target.value)}
                                value={values.email}
                                type="email"
                                prefix={<Icon type="user" />}
                                placeholder="Email"
                                name={fields.email}
                                ref={FormHelpers.registerField(register as any, {
                                    required: "Email is required.",
                                    pattern: {
                                        value: ValidationHelpers.emailRegex,
                                        message: "Please provide a valid email."
                                    }
                                })}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={BootstrapHelpers.formFieldClasses}>
                        <Form.Item
                            validateStatus={errors.username && "error"}
                            help={errors.username && errors.username.message}>
                            <Input
                                onChange={(e) => setValue(fields.username, e.target.value)}
                                value={values.username}
                                type="text"
                                prefix={<Icon type="user" />}
                                placeholder="Username"
                                name={fields.username}
                                ref={FormHelpers.registerField(register as any, {
                                    required: "Username is required.",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters long."
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Username must be shorter than 15 characters."
                                    }
                                })}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={BootstrapHelpers.formFieldClasses}>
                        <Form.Item
                            validateStatus={errors.password && "error"}
                            help={errors.password && errors.password.message}>
                            <Input.Password
                                onChange={(e) => setValue(fields.password, e.target.value)}
                                value={values.password}
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Password"
                                name={fields.password}
                                ref={FormHelpers.registerField(register as any, {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long"
                                    }
                                })}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={BootstrapHelpers.formFieldClasses}>
                        <Form.Item
                            validateStatus={errors.confirmPassword && "error"}
                            help={errors.confirmPassword && errors.confirmPassword.message}>
                            <Input.Password
                                onChange={(e) => setValue(fields.confirmPassword, e.target.value)}
                                value={values.confirmPassword}
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="Confirm password"
                                name={fields.confirmPassword}
                                ref={FormHelpers.registerField(register as any, {
                                    required: "Confirm password is required.",
                                    validate: (value: any) => value === watch(fields.password) || "Passwords do not match."
                                })}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={StringHelpers.joinClassNames(BootstrapHelpers.formFieldClasses, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                    </Button>
                    </div>

                </div>
            </form>
        </Spin>
    );
});
