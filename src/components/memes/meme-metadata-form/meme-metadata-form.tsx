import * as React from "react";
import { memo } from "react";
import { Spin, Input, Form, Icon, Button, Select } from "antd";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import { ReduxStore } from "../../../types/redux-store";
import useForm from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { FormErrorMessage } from "../../misc/form-error-message/form-error-message";
import { FormHelpers } from "../../../common/helpers/form-helpers";
import { StringHelpers } from "../../../helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { useFirestoreConnect } from "react-redux-firebase";
import { SelectValue } from "antd/lib/select";
import { default as classes } from "./meme-metadata-form.module.scss";
import { Tag } from "../../../models/memes/tag";
import { Dispatch } from "redux";
import { MemeMetadata } from "../../../models/memes/meme-metadata";
import { collectionNames } from "../../../common/constants/collection-names";

const { Option } = Select;

export const MemeMetadataForm: React.FC = memo(() => {
    const { register, handleSubmit, errors, getValues, setValue } = useForm<MemeMetadata>({
        mode: "onBlur"
    });

    const memeUploadErrorMessage: string | undefined = useSelector((store: ReduxStore) =>
        store.memeUpload.memeSubmitError && store.memeUpload.memeSubmitError.message);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.memeUpload.isLoading);
    const firestore: any = useSelector((store: ReduxStore) => store.firestore);
    const tags: Tag[] = firestore.ordered.tags;
    const fetching: boolean = firestore.status.requesting.tags;
    const values: MemeMetadata = getValues();
    const dispatch: Dispatch<any> = useDispatch();

    useFirestoreConnect([
        {
            collection: collectionNames.tags,
            orderBy: ["name", "asc"]
        },
    ]);

    const fields = {
        title: "title",
        tags: "tags"
    };

    register({ name: fields.tags }, {
        validate: (value: any) => (!!value && value.length > 0) || "Please select at least one tag."
    });

    if (memeUploadErrorMessage && isLoading) {
        dispatch(MemeUploadActions.stopLoading());
    }

    function onSubmit(data: MemeMetadata): void {
        console.log(data);
        debugger;
    }

    const children: JSX.Element[] = [];
    if (tags) {
        for (const tag of tags) {
            children.push(<Option key={tag.id}>{tag.name}</Option>);
        }
    }

    return (
        <Spin spinning={isLoading} delay={100}>
            <form noValidate className={bootstrap.containerFluid} onSubmit={handleSubmit(onSubmit)}>

                <FormErrorMessage showErrorMessage={!!memeUploadErrorMessage} errorMessage={memeUploadErrorMessage} />

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col12}>
                        <Form.Item
                            validateStatus={errors.title && "error"}
                            help={errors.title && errors.title.message}>
                            <Input
                                onChange={(e) => setValue(fields.title, e.target.value)}
                                value={values.title}
                                prefix={<Icon type="font-size" />}
                                placeholder="Title"
                                name={fields.title}
                                ref={FormHelpers.registerField(register as any, {
                                    required: "Please provide a title.",
                                    maxLength: {
                                        value: 30,
                                        message: "The title must be shorter than 30 chracters"
                                    }
                                })}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                    <div className={bootstrap.col12}>
                        <Form.Item
                            validateStatus={errors.tags && "error"}
                            help={errors.tags && errors.tags.message}>
                            <Input.Group compact>
                                <Input
                                    className={classes.tagPrefixIcon}
                                    prefix={<Icon type="tag" />}
                                    style={{ width: "7%" }}
                                    readOnly
                                    disabled
                                />
                                <Select
                                    notFoundContent={fetching ? <Spin size="small" /> : null}
                                    mode="multiple"
                                    style={{ width: "93%" }}
                                    placeholder="Tags"
                                    onChange={(val: SelectValue) => setValue(fields.tags, val)}
                                    optionFilterProp="name"
                                    filterOption={(value, option) => {
                                        if (option.props.children) {
                                            return (option.props.children as string).toLowerCase().indexOf(value.toLowerCase()) >= 0;
                                        }
                                        return false;
                                    }}
                                >
                                    {children}
                                </Select>
                            </Input.Group>

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
