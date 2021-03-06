import * as React from "react";
import { memo } from "react";
import Uppy, { UppyFile } from "@uppy/core";
import { ImageUploaderProps } from "./image-uploader-props";
import { FileHelpers } from "../../../common/helpers/file-helpers";
import { DashboardModal } from "@uppy/react";

export const ImageUploader: React.FC<ImageUploaderProps> = memo((props: ImageUploaderProps) => {
    const uppy: Uppy.Uppy = Uppy({
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ["image/*"]
        },
        autoProceed: true
    });

    async function onImageUpload(): Promise<void> {
        const file: UppyFile<{}, {}> = uppy.getFiles()[0];
        const b64: string = await FileHelpers.toBase64(file.data);
        const elements: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName("body");
        if (elements && elements[0]) {
            elements[0].classList.remove("uppy-Dashboard-isFixed");
        }
        uppy.reset();
        if (props.onFileUploaded) {
            props.onFileUploaded(b64);
        }
    }

    uppy.off("upload", onImageUpload);
    uppy.on("upload", onImageUpload);

    return (
        <div>
            <DashboardModal onRequestClose={props.onRequestClose} open={props.isOpen} inline={false} uppy={uppy} />
        </div>
    );
});
