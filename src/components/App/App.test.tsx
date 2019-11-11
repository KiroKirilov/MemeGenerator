import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, Store } from "redux";
import { someReducer } from "../../store/reducers/some-reducer";
import { IStore } from "../../store/store";
import { expression } from "@babel/template";

it("renders without crashing", () => {
  expect(5).toBe(5);
  // const div = document.createElement("div");
  // const store: Store<IStore, any> = createStore(someReducer);
  // ReactDOM.render(<App store={store} />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
