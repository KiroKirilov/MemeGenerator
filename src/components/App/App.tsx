import * as React from "react";
import { default as classes } from "./App.module.scss";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import { Home } from "../home/home";
import { Register } from "../auth/register/register";
import { Provider } from "react-redux";
import { IStore } from "../../store/store";
import { Store } from "redux";
import { Editor } from "../home/editor";
import "antd/dist/antd.css";
import { NavBar } from "../layout/nav-bar/nav-bar";
import { Login } from "../auth/login/login";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/editor" component={Editor} />
      </Switch>

      <footer>
        This is the footer
        </footer>
    </BrowserRouter>
  );
};

export default App;
