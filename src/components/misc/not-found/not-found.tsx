import * as React from "react";
import { memo } from "react";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../helpers/string-helpers";
import notFound from "../../../assets/images/notFound.jpg";

export const NotFound: React.FC = memo(() => {
    return (
        <div className={bootstrap.containerFluid}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                    <img style={{
                        maxWidth: "400px",
                        width: "100%",
                        height: "auto"
                    }} src={notFound} />
                </div>
            </div>
        </div>
    );
});
