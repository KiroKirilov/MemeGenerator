import * as React from "react";
import { memo } from "react";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import notFound from "../../../assets/images/notFound.jpg";
import { Button } from "antd";
import { default as classes } from "./not-found.module.scss";
import { useHistory } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import Title from "antd/lib/typography/Title";

export const NotFound: React.FC = memo(() => {
    const history = useHistory();

    return (
        <div className={bootstrap.containerFluid}>
            <div className={StringHelpers.joinClassNames(bootstrap.row, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter, bootstrap.flexColumn, bootstrap.alignItemsCenter)}>

                    <div className={StringHelpers.joinClassNames(bootstrap.textCenter)}>
                        <Title level={1}>404</Title>
                    </div>

                    <div className={StringHelpers.joinClassNames(bootstrap.textCenter, classes.notFoundMessageContainer)}>
                        <div className={classes.notFoundMessage}>What are you doing here?</div>
                        <Button
                            icon="home"
                            onClick={() => history.push(appRoutes.home)}
                            type="primary">
                            Go Back Home
                        </Button>
                    </div>

                    <div>
                        <img style={{
                            maxWidth: "400px",
                            width: "100%",
                            height: "auto"
                        }} src={notFound} />
                    </div>
                </div>
            </div>
        </div>
    );
});
