import * as React from "react";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { MemeImageEditor } from "../meme-image-editor/meme-image-editor";
import { StringHelpers } from "../../../helpers/string-helpers";
import { memo } from "react";
import { MemeUploadDashboard } from "../meme-upload-dashboard/meme-upload-dashboard";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";

export const EditMeme: React.FC = memo(() => {
    const isUploaded = useSelector((store: ReduxStore) => !!store.memeUpload.uploadedImageSrc);

    return (
        <div className={bootstrap.containerFluid}>
            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.colxl8, bootstrap.colLg8, bootstrap.colMd8, bootstrap.colSm12)}>
                    {
                        isUploaded
                        ? <MemeImageEditor />
                        : <MemeUploadDashboard />
                    }
                    
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.colxl4, bootstrap.colLg4, bootstrap.colMd4, bootstrap.colSm12)}>
                    <div style={{ backgroundColor: "red" }}>Side bar here</div>
                </div>
            </div>
        </div>
    );
});
