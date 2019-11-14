import * as React from "react";
import { Input, Icon, Button, Form, Spin } from "antd";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../../store/actions/auth-actions";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../helpers/string-helpers";
import { ReduxStore } from "../../../types/redux-store";
import { ValidationHelpers } from "../../../common/helpers/validation-helpers";
import { FormErrorMessage } from "../../common/form-error-message/form-error-message";
import { FormHelpers } from "../../../common/helpers/form-helpers";
import { memo } from "react";

export const Login: React.FC = memo(() => {
    const { register, handleSubmit, errors, getValues, setValue } = useForm({
        mode: "onBlur"
    });

    const loginErrorMessage = useSelector((store: ReduxStore) => store.auth.loginError && store.auth.loginError.message);
    const isLoading = useSelector((store: ReduxStore) => store.auth.isLoading);
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const values = getValues();
    const dispatch = useDispatch();

    const fields = {
        email: "email",
        password: "password"
    };

    if (loginErrorMessage && isLoading) {
        dispatch(AuthActions.stopLoading());
    }

    const onSubmit = (data: any) => {
        dispatch(AuthActions.startLoading());
        dispatch(AuthActions.login(data));
    };

    return (
        <Spin spinning={isLoading} delay={100}>
            <form noValidate className={bootstrap.containerFluid} onSubmit={handleSubmit(onSubmit)}>

                <FormErrorMessage showErrorMessage={!!loginErrorMessage} errorMessage={loginErrorMessage} />

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col3}>
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
                    <div className={bootstrap.col3}>
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
                                    required: true,
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
                    <div className={StringHelpers.joinClassNames(bootstrap.col3, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </div>
                </div>

            </form>

        </Spin>
    );
});