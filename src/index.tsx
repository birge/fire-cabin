import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { createRenderer } from "fela";
import { RendererProvider as FelaProvider } from "react-fela";

import configureStore from "./store";
import App from "./App";

import "./database";

const store = configureStore();

const renderer = createRenderer();

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <ReduxProvider store={store}>
    <FelaProvider renderer={renderer}>
      <App />
    </FelaProvider>
  </ReduxProvider>
);
