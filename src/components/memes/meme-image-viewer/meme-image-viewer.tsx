import * as React from "react";
import { memo, useState, useEffect } from "react";
import { MemeImageEditor } from "../meme-image-editor/meme-image-editor";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-image-viewer.module.scss";
import { Button } from "antd";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";

export const MemeImageViewer: React.FC = memo(() => {
    const maxHeight = 550;

    const uploadedImageSrc = useSelector((store: ReduxStore) => store.memeUpload.uploadedImageSrc || "");
    const image: HTMLImageElement | undefined = useSelector((store: ReduxStore) => store.memeUpload.image);
    const isInEdit = useSelector((store: ReduxStore) => store.memeUpload.isInEdit);
    const editorRef = useSelector((store: ReduxStore) => store.memeUpload.editorRef);
    const [ratio, setRation] = useState(0);
    const dispatch = useDispatch();

    async function updateRatio(): Promise<void> {
        if (image) {
            const ratio: number = image.width / image.height;
            setRation(ratio);
        }
    }

    useEffect(() => {
        updateRatio();
    }, []);

    return (
        <div>
            {
                isInEdit
                    ? <MemeImageEditor />
                    : <div className={StringHelpers.joinClassNames(bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <img
                            style={{
                                maxWidth: `${maxHeight * ratio}px`,
                                maxHeight: `${maxHeight}px`,
                                width: "100%",
                                height: "auto"
                            }}
                            src={uploadedImageSrc} />
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
                                    onClick={() => {
                                        if (editorRef && editorRef.current) {
                                            const dataUrl: string = editorRef.current.getInstance().toDataURL();
                                            dispatch(MemeUploadActions.memeUploaded(dataUrl));
                                        }
                                    }}
                                    type="primary"
                                    className={classes.bgSuccess}>
                                    Save
                                </Button>

                                <Button icon="close" onClick={() => dispatch(MemeUploadActions.stopEditing())} type="primary">
                                    Cancel
                                </Button>
                            </>)
                            : (<Button icon="edit" onClick={() => dispatch(MemeUploadActions.startEditing())} type="primary">Edit</Button>)
                    }

                    <Button icon="delete" onClick={() => dispatch(MemeUploadActions.resetState())} type="danger">Different image</Button>

                </div>

            </div>

        </div>
    );
});
