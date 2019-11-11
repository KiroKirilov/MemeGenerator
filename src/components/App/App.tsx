import * as React from "react";
import { default as classes } from "./App.module.scss";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { NavBar } from "../layout/nav-bar/nav-bar";
import { Login } from "../auth/login/login";
import { appRoutes } from "../../common/constants/app-routes";
import { ProtectedRoute, AnonymousOnlyRoute } from "../custom-routes/auth-routes";
import { Register } from "../auth/register/register";
import { Editor } from "../home/editor";
import { Home } from "../home/home";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../types/redux-store";

const App: React.FC = () => {
  const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);

  return (
    <BrowserRouter>

      {
        !!auth.isLoaded
          ? (
            <>
              <NavBar />
              <Switch>
                <Route exact path={appRoutes.home} component={Home} />
                <AnonymousOnlyRoute path={appRoutes.register} component={Register} />
                <AnonymousOnlyRoute path={appRoutes.login} component={Login} />
                <ProtectedRoute path={appRoutes.editor} component={Editor} />
              </Switch>
              <footer>
                This is the footer
              </footer>
            </>
          )
          : null}

    </BrowserRouter>
  );
};

export default App;
