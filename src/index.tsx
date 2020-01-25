import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createRenderer } from "fela";
import { Provider as FelaProvider } from "react-fela";

import configureStore from "./store";
import App from "./App";

import "./database";

const store = configureStore();

const renderer = createRenderer();

ReactDOM.render(
  <ReduxProvider store={store}>
    <FelaProvider renderer={renderer}>
      <App />
    </FelaProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
