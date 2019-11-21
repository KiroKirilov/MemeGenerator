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
import { Modal } from "antd";

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
        <div>
            <div>
                <button className="openButton">open me</button>
                <Dashboard trigger=".openButton" inline={false} uppy={uppy} />
            </div>

            <div>
                <button onClick={() => {
                    setVisible(true);
                }}>get templates</button>
            </div>

            <div>
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
    );
});
