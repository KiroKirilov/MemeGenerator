import * as React from "react";
import { default as classes } from "./App.module.scss";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import { Home } from "../Home/home";
import { Register } from "../auth/register/register";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Editor } from "../Home/editor";
import "antd/dist/antd.css";
import { NavBar } from "../layout/nav-bar/nav-bar";
import { Login } from "../auth/login/login";
import { appRoutes } from "../../common/constants/app-routes";
import { ProtectedRoute } from "../custom-routes/protected-route";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBar />

        <Route exact path={appRoutes.home} component={Home} />
      <Switch>
        <Route path={appRoutes.register} component={Register} />
        <Route path={appRoutes.login} component={Login} />
        <ProtectedRoute path={appRoutes.editor} component={Editor} />
      </Switch>

      <footer>
        This is the footer
        </footer>
    </BrowserRouter>
  );
};

export default App;
