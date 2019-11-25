import * as React from "react";
import { memo } from "react";
import { MemeImageEditor } from "../meme-image-editor/meme-image-editor";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { StringHelpers } from "../../../helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-image-viewer.module.scss";
import { BootstrapHelpers } from "../../../common/helpers/bootstrap-helpers";
import { Button } from "antd";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import { ImageEditorRef } from "../../../types/image-editor-reference";

export const MemeImageViewer: React.FC = memo(() => {
    const uploadedImageSrc = useSelector((store: ReduxStore) => store.memeUpload.uploadedImageSrc || "");
    const isInEdit = useSelector((store: ReduxStore) => store.memeUpload.isInEdit);
    const dispatch = useDispatch();

    return (
        <div>
            {
                isInEdit
                    ? <MemeImageEditor />
                    : <div className={StringHelpers.joinClassNames(bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <img style={{
                            maxWidth: "400px",
                            width: "100%",
                            height: "auto"
                        }} src={uploadedImageSrc} />
                    </div>
            }

            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.justifyContentCenter)}>
                <div
                    className={StringHelpers.joinClassNames(
                        bootstrap.colXl4, bootstrap.colLg6, bootstrap.colMd8, bootstrap.colSm12,
                        bootstrap.dFlex,
                        bootstrap.justifyContentAround,
                        classes.imageActionButtons
                    )}>
                    {
                        isInEdit
                            ? (<>
                                <Button icon="save"
                                    onClick={() => dispatch(MemeUploadActions.stopEditing())} type="primary">
                                    Save
                                </Button>

                                <Button icon="save" onClick={() => dispatch(MemeUploadActions.stopEditing())} type="primary">
                                    Cancel
                                </Button>
                            </>)
                            : (<Button icon="edit" onClick={() => dispatch(MemeUploadActions.startEditing())} type="primary">Edit</Button>)
                    }

                    <Button icon="delete" onClick={() => dispatch(MemeUploadActions.resetImage())} type="danger">Different image</Button>

                </div>

            </div>

        </div>
    );
});
