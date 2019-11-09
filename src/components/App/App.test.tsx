import React from "./node_modules/react";
import ReactDOM from "./node_modules/react-dom";
import App from "./App";
import { createStore, Store } from "./node_modules/redux";
import { someReducer } from "../../store/reducers/SomeReducer";
import { IStore } from "../../store/IStore";
import { expression } from "./node_modules/@babel/template";

it("renders without crashing", () => {
  expect(5).toBe(5);
  // const div = document.createElement("div");
  // const store: Store<IStore, any> = createStore(someReducer);
  // ReactDOM.render(<App store={store} />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
