import * as React from "react";
import { default as classes } from "./App.module.scss";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Auth/Register/Register";
import { Provider } from "react-redux";
import { IStore } from "../../store/IStore";
import { Store } from "redux";
import { Editor } from "../Home/Editor";
import "antd/dist/antd.css";

const App: React.FC<{ store: Store<IStore, any> }> = ({ store }) => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <header className="App-header">
          This is the header
          <div>
            <Link to="/">GO TO HOME</Link>
            <Link to="/register">GO TO REGISTER</Link>
            <Link to="/editor">GO TO EDITOR</Link>
          </div>
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/editor" component={Editor} />
        </Switch>

        <footer>
          This is the footer
        </footer>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
