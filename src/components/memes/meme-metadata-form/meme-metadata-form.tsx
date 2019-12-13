import * as React from "react";
import { memo, useEffect } from "react";
import { Spin, Input, Form, Icon, Button, Select } from "antd";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import { ReduxStore } from "../../../types/redux-store";
import useForm from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { FormErrorMessage } from "../../misc/form-error-message/form-error-message";
import { FormHelpers } from "../../../common/helpers/form-helpers";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { useFirestoreConnect } from "react-redux-firebase";
import { SelectValue } from "antd/lib/select";
import { Tag } from "../../../models/memes/tag";
import { Dispatch } from "redux";
import { MemeMetadata } from "../../../models/memes/meme-metadata";
import { collectionNames } from "../../../common/constants/collection-names";
import { TagPicker } from "../../tags/tag-picker/tag-picker";
import { FirebaseError } from "../../../types/firebase-error";

export const MemeMetadataForm: React.FC = memo(() => {
    const { register, handleSubmit, errors, getValues, setValue } = useForm<MemeMetadata>({
        mode: "onBlur"
    });

    const memeUploadError: FirebaseError | undefined = useSelector((store: ReduxStore) =>
        store.memeUpload.memeSubmitError);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.memeUpload.isLoading);
    const imageInEdit: boolean = useSelector((store: ReduxStore) => store.memeUpload.isInEdit);
    const imageSrc: string | undefined = useSelector((store: ReduxStore) => store.memeUpload.uploadedImageSrc);
    const values: MemeMetadata = getValues();
    const dispatch: Dispatch<any> = useDispatch();
    const profile = useSelector((store: ReduxStore) => store.firebase.profile);
    const userId = useSelector((store: ReduxStore) => store.firebase.auth.uid);

    useFirestoreConnect([
        {
            collection: collectionNames.tags,
            orderBy: ["name", "asc"]
        },
    ]);

    const fields = {
        title: "title",
        tags: "tags",
        image: "image"
    };

    register({ name: fields.tags }, {
        validate: (value: any) => (!!value && value.length > 0) || "Please select at least one tag."
    });

    register({ name: fields.image }, {
        validate: (value: any) => {
            if (imageInEdit) {
                return "Please save or discard your changes first.";
            }

            if (!imageSrc) {
                return "Please upload an image.";
            }

            return true;
        }
    });

    if (memeUploadError && isLoading) {
        dispatch(MemeUploadActions.stopLoading());
    }

    function onSubmit(data: MemeMetadata): void {
        dispatch(MemeUploadActions.memeSubmitted(data, {
            id: userId,
            username: profile.username
        }));
    }

    function handleTagsChange(val: SelectValue, tags: Tag[]): void {
        if (val) {
            const selectedTags: Tag[] = tags.filter((tag: Tag) => (val as string[]).indexOf(tag.id) >= 0);
            setValue(fields.tags, selectedTags.map(t => t.name));
        }
    }

    return (
        <form noValidate className={bootstrap.containerFluid} onSubmit={handleSubmit(onSubmit)}>

            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                <div className={bootstrap.col12}>
                    <FormErrorMessage showErrorMessage={!!memeUploadError} errorMessage={memeUploadError && memeUploadError.message} />
                </div>
            </div>

            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                <div className={bootstrap.col12}>
                    <FormErrorMessage showErrorMessage={!!errors.image} errorMessage={errors.image ? errors.image.message : ""} />
                </div>
            </div>

            <input type="hidden" name="image" />

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
                                minLength: {
                                    value: 3,
                                    message: "The title must be at least 3 chracters long"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "The title must be shorter than 50 chracters"
                                }
                            })}
                        />
                    </Form.Item>
                </div>
            </div>

            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                <div className={bootstrap.col12}>
                    <TagPicker
                        onChange={(val, _opts, tags) => handleTagsChange(val as any, tags)}
                        validateStatus={errors.tags && "error"}
                        help={errors.tags && errors.tags.message}
                    />
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
    );
});
