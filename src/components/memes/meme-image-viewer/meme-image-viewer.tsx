import * as React from "react";
import { memo, createRef, useEffect, useState } from "react";
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
import { ImageHelpers } from "../../../common/helpers/image-helpers";

export const MemeImageViewer: React.FC = memo(() => {
    const maxHeight = 550;

    const uploadedImageSrc = useSelector((store: ReduxStore) => store.memeUpload.uploadedImageSrc || "");
    const isInEdit = useSelector((store: ReduxStore) => store.memeUpload.isInEdit);
    const [ratio, setRation] = useState(0);
    const dispatch = useDispatch();
    const imageRef: React.RefObject<HTMLImageElement> = createRef<HTMLImageElement>();

    async function updateRatio() {
        if (!!imageRef && !!imageRef.current) {
            const image: HTMLImageElement = await ImageHelpers.loadImage(imageRef.current.src);
            const ratio = image.width / image.height;
            console.log(`Ratio: ${ratio}`);
            setRation(ratio);
        }
    }

    useEffect(() => {
        updateRatio();
    }, [imageRef.current, imageRef.current ? imageRef.current.offsetHeight : 0, imageRef.current ? imageRef.current.offsetWidth : 0]);

    return (
        <div>
            {
                isInEdit
                    ? <MemeImageEditor />
                    : <div className={StringHelpers.joinClassNames(bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <img
                            ref={imageRef}
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
