import * as React from "react";
import { memo } from "react";
import { Layout } from "antd";
import { default as classes } from "./footer.module.scss";

export const Footer: React.FC = memo(() => {
    return (
        <Layout.Footer className={classes.footerAtTheBottom} style={{ textAlign: "center" }}>
            Supreme Memes ©2019 Created by Kiro
        </Layout.Footer>
    );
});
