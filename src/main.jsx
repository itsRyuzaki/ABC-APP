import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./routes";
import { AppStore } from "./store/AppStore";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <RouterProvider router={routerConfig} />
  </Provider>
);
