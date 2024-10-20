import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ROUTER_CONSTANTS } from "./config/router-constants";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ROUTER_CONSTANTS.mobiles,
        loader: async () => await import("./modules/config/Mobiles.config"),
        lazy: () => import("./modules/ItemsPage/ItemsPage"),
      },
      {
        path: ROUTER_CONSTANTS.computersAndLaptops,
        loader: async () =>
          await import("./modules/config/ComputersLaptops.config"),
        lazy: () => import("./modules/ItemsPage/ItemsPage"),
      },
    ],
  },
]);
