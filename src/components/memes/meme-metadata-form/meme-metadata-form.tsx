import * as React from "react";
import { memo } from "react";
import { Spin, Input, Form, Icon, Button, Select } from "antd";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import { ReduxStore } from "../../../types/redux-store";
import useForm from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { BootstrapHelpers } from "../../../common/helpers/bootstrap-helpers";
import { FormErrorMessage } from "../../misc/form-error-message/form-error-message";
import { FormHelpers } from "../../../common/helpers/form-helpers";
import { StringHelpers } from "../../../helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { useFirestoreConnect } from "react-redux-firebase";
import { SelectValue } from "antd/lib/select";

const { Option } = Select;

export const MemeMetadataForm: React.FC = memo(() => {
    const { register, handleSubmit, errors, getValues, setValue } = useForm({
        mode: "onBlur"
    });


    // tODO: do not get from auth store!
    const memeUploadErrorMessage = useSelector((store: ReduxStore) => store.auth.loginError && store.auth.loginError.message);
    const isLoading = useSelector((store: ReduxStore) => store.auth.isLoading);
    const firestore = useSelector((store: ReduxStore) => store.firestore);
    const tags = firestore.ordered.tags;
    const fetching: boolean = firestore.status.requesting.tags;
    const values = getValues();
    const dispatch = useDispatch();

    useFirestoreConnect([
        { collection: "tags" }
    ]);

    const fields = {
        title: "title",
        tags: "tags"
    };

    register({ name: fields.tags }, { required: "Please select at least one tag." })

    if (memeUploadErrorMessage && isLoading) {
        dispatch(MemeUploadActions.stopLoading());
    }

    function onSubmit(data: any): void {
        console.log(data);
        debugger;
    }

    const children = [];
    if (tags) {
        for (const tag of tags) {
            children.push(<Option key={tag.id}><Icon type="tag" /> {tag.name}</Option>);
        }
    }

    return (
        <Spin spinning={isLoading} delay={100}>
            <form noValidate className={bootstrap.containerFluid} onSubmit={handleSubmit(onSubmit)}>

                <FormErrorMessage showErrorMessage={!!memeUploadErrorMessage} errorMessage={memeUploadErrorMessage} />

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col12}>
                        <Form.Item
                            validateStatus={errors.email && "error"}
                            help={errors.email && errors.email.message}>
                            <Input
                                onChange={(e) => setValue(fields.title, e.target.value)}
                                value={values.title}
                                prefix={<Icon type="font-size" />}
                                placeholder="Title"
                                name={fields.title}
                                ref={FormHelpers.registerField(register as any)}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col12}>
                        <Form.Item
                            validateStatus={errors.email && "error"}
                            help={errors.email && errors.email.message}>
                            <Select
                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={(val: SelectValue) => setValue(fields.tags, val)}
                            >
                                {children}
                            </Select>
                        </Form.Item>

                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div
                        className={StringHelpers.joinClassNames(
                            bootstrap.col12,
                            bootstrap.dFlex,
                            bootstrap.justifyContentCenter)}>
                        <Button icon="enter" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </div>

            </form>

        </Spin>
    );
});
