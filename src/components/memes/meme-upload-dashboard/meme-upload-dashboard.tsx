import * as React from "react";
import { memo, useState, useEffect } from "react";
import { Dashboard } from "@uppy/react";
import Uppy, { UppyFile } from "@uppy/core";
import { useDispatch } from "react-redux";
import { MemeTemplateActions } from "../../../store/actions/meme-template-actions";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/provider-views/dist/style.css";
import { MemeTemplatePicker } from "../meme-template-picker/meme-template-picker";
import { Dispatch } from "redux";
import { Modal, Button, Typography } from "antd";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-upload-dashboard.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";
import { ImageUploader } from "../../misc/image-uploader/image-uploader";

export const MemeUploadDashboard: React.FC = memo(() => {
    const dispatch: Dispatch<any> = useDispatch();
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        dispatch(MemeTemplateActions.getPopularTemplates());
    }, []);

    return (
        <div className={bootstrap.containerFluid}>
            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                    <ImageUploader
                        buttonClasses={classes.memeUploadDashboardButton}
                        onFileUploaded={(b64: string) => dispatch(MemeUploadActions.memeUploaded(b64))} />
                </div>
            </div>

            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                    <Typography.Text style={{ marginTop: 10, marginBottom: 10 }} strong>or alternatively</Typography.Text>
                </div>
            </div>

            <div className={bootstrap.row}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                    <Button
                        className={classes.memeUploadDashboardButton}
                        onClick={() => setVisible(true)} icon="rise">
                        Use a popular template
                    </Button>

                    <Modal
                        footer={null}
                        title="Popular templates"
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        style={{ top: 20 }}
                    >
                        <MemeTemplatePicker />
                    </Modal>
                </div>
            </div>
        </div>
    );
});
