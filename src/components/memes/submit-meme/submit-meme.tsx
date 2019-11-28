import * as React from "react";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { MemeImageEditor } from "../meme-image-editor/meme-image-editor";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { memo } from "react";
import { MemeUploadDashboard } from "../meme-upload-dashboard/meme-upload-dashboard";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { MemeImageViewer } from "../meme-image-viewer/meme-image-viewer";
import { MemeMetadataForm } from "../meme-metadata-form/meme-metadata-form";
import { Spin, message } from "antd";
import { useLocation, Redirect } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";

export const SumbitMeme: React.FC = memo(() => {
    const isUploaded: boolean = useSelector((store: ReduxStore) => !!store.memeUpload.uploadedImageSrc);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.memeUpload.isLoading);
    const successfullySubmited: boolean = useSelector((store: ReduxStore) => store.memeUpload.successfullySubmited);
    const location = useLocation();

    if (successfullySubmited) {
        message.success("Successfully submitted meme!");
        return <Redirect to={{ pathname: appRoutes.home, state: { from: location } }} />
    }

    return (
        <Spin spinning={isLoading} delay={100}>
            <div className={bootstrap.containerFluid}>
                <div className={bootstrap.row}>
                    <div className={StringHelpers.joinClassNames(bootstrap.colxl8, bootstrap.colLg8, bootstrap.colMd8, bootstrap.colSm12)}>
                        {
                            isUploaded
                                ? <MemeImageViewer />
                                : <MemeUploadDashboard />
                        }
                    </div>

                    <div className={StringHelpers.joinClassNames(bootstrap.colxl4, bootstrap.colLg4, bootstrap.colMd4, bootstrap.colSm12)}>
                        <MemeMetadataForm />
                    </div>
                </div>
            </div>
        </Spin>
    );
});
