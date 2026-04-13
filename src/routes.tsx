import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ROUTER_CONSTANTS } from "./config/router-constants";
import LazyComponent from "./shared/LazyComponent/LazyComponent";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ROUTER_CONSTANTS.admin,
        children: [
          {
            path: ":accessoryType",
            children: [
              {
                path: "add",
                element: (
                  <LazyComponent
                    pathFn={() =>
                      import("./modules/admin/ManageAccessory/AddAccessory")
                    }
                  ></LazyComponent>
                ),
              },
            ],
          },
        ],
      },
      {
        path: ROUTER_CONSTANTS.mobiles,
        children: [
          {
            path: ":id",
            loader: async () => await import("./modules/config/Mobiles.config"),
            element: (
              <LazyComponent
                pathFn={() =>
                  import("./modules/AccessoryDetails/AccessoryDetails")
                }
              />
            ),
          },
          {
            path: "",
            loader: async () => await import("./modules/config/Mobiles.config"),
            element: (
              <LazyComponent
                pathFn={() =>
                  import("./modules/AccessoryListing/AccessoryListing")
                }
              />
            ),
          },
        ],
      },
      {
        path: ROUTER_CONSTANTS.computersAndLaptops,
        children: [
          {
            path: "",
            loader: async () =>
              await import("./modules/config/ComputersLaptops.config"),
            element: (
              <LazyComponent
                pathFn={() =>
                  import("./modules/AccessoryListing/AccessoryListing")
                }
              />
            ),
          },
        ],
      },
    ],
  },
]);
