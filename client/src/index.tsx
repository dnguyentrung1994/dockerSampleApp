import React from "react";
import { createRoot } from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import setupInterceptor from "./utils/api-calls/setupInterceptor";
import { BrowserRouter } from "react-router-dom";

setupInterceptor(store);
const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
