import * as React from "react";
import { memo, useState, useEffect } from "react";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
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
import { StringHelpers } from "../../../helpers/string-helpers";

const uppy: Uppy.Uppy = Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"]
    },
    autoProceed: true
});

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
                    <Button className={classes.memeUploadDashboardButton} type="primary" id="open-uppy" icon="upload">Upload your own</Button>

                    <Dashboard trigger="#open-uppy" inline={false} uppy={uppy} />
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
