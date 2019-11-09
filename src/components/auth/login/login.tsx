import * as React from 'react';
import { Input, Icon, Button, Form } from 'antd';
import useForm from 'react-hook-form';

export const Login: React.FC = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
        debugger;
    };

    const registerField = (validationRules?: any) => {
        return (fieldRef: any) => {
            if (fieldRef) {
                // @ts-ignore
                return register(validationRules || {})(fieldRef.input);
            }
        }
    }

    return (
        <form onSubmit={e => {
            console.log("called submit");
            console.log(errors);
            return handleSubmit(onSubmit)(e);
        }}>
            <div>
                <Form.Item 
                    validateStatus={errors.username && "error"} 
                    help={errors.username && "Username is required."}>
                    <Input

                        prefix={<Icon type="user" />}
                        placeholder="Username"
                        name="username"
                        ref={registerField({ required: true })}
                    />
                </Form.Item>

            </div>

            <div>
                <Input
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={registerField({ required: true })}
                />
            </div>

            <div>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </div>
        </form>
    );
};
