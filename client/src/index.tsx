import React from "react";
import { createRoot } from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { Navbar } from "./components/common/Navbar";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <Provider store={store}>
    <Navbar />
    <App />
  </Provider>
);
