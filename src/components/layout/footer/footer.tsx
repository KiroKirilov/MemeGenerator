import * as React from "react";
import { memo } from "react";
import { Layout } from "antd";
import { default as classes } from "./footer.module.scss";

export const Footer: React.FC = memo(() => {
    return (
        <Layout.Footer className={classes.footerAtTheBottom} style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
    );
});
