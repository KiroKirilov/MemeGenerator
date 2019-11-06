import * as React from 'react';
import logo from "../../assets/images/logo.svg";
import { default as classes } from './App.module.scss';
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Home } from '../Home/Home';
import { Register } from '../Auth/Register/Register';
import { Provider } from 'react-redux';
import { IStore } from '../../store/IStore';
import { Store } from 'redux';

const App: React.FC<{store: Store<IStore, any>}> = ({ store }) => {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className={classes.App}>
        <header className="App-header">
          This is the header
        <Link to="/">GO TO HOME</Link>
          <Link to="/register">GO TO REGISTER</Link>
        </header>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <footer>
          This is the footer
      </footer>
      </div>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
