import * as React from "react";
import { memo } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { appRoutes } from "../../../common/constants/app-routes";
import { Home } from "../../home/home";
import { Login } from "../../auth/login/login";
import { Register } from "../../auth/register/register";
import { EditMeme } from "../../memes/edit-meme/edit-meme";
import { NotFound } from "../../common/not-found/not-found";
import { default as classes } from "./main-section.module.scss";
import { AnonymousOnlyRoute, ProtectedRoute } from "../../common/custom-routes/auth-routes";

export const MainSection: React.FC = memo(() => {
    return (
        <Layout.Content className={classes.mainContent}>
            <div style={{ background: "#fff", padding: 24, minHeight: "79.5vh" }}>
                <Switch>
                    <Route exact path={appRoutes.home} component={Home} />
                    <AnonymousOnlyRoute path={appRoutes.register} component={Register} />
                    <AnonymousOnlyRoute path={appRoutes.login} component={Login} />
                    <ProtectedRoute path={appRoutes.editor} component={EditMeme} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Layout.Content>
    );
});
