import * as React from 'react';
import { memo } from 'react';
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import "@uppy/provider-views/dist/style.css";

const uppy = Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"]
    },
    autoProceed: true
});

export const MemeUploadDashboard: React.FC = memo(() => {
    return (
        <div>
            <button className="openButton">open me</button>
            <Dashboard trigger=".openButton" inline={false} uppy={uppy} />
        </div>
    );
});
