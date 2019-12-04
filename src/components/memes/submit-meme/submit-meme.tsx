import * as React from "react";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { memo, useEffect } from "react";
import { MemeUploadDashboard } from "../meme-upload-dashboard/meme-upload-dashboard";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { MemeImageViewer } from "../meme-image-viewer/meme-image-viewer";
import { MemeMetadataForm } from "../meme-metadata-form/meme-metadata-form";
import { Spin, notification } from "antd";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";

export const SumbitMeme: React.FC = memo(() => {
    const isUploaded: boolean = useSelector((store: ReduxStore) => !!store.memeUpload.uploadedImageSrc);
    const isLoading: boolean = useSelector((store: ReduxStore) => store.memeUpload.isLoading);
    const successfullySubmited: boolean = useSelector((store: ReduxStore) => store.memeUpload.memeSuccessfullySubmited);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        return () => {
            dispatch(MemeUploadActions.resetState());
        };
    }, []);

    if (successfullySubmited) {
        notification.success({
            message: "Successfully submitted meme!"
        });

        history.push(appRoutes.home, { from: location });
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
