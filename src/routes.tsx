import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";
import App from "./App";
import { ROUTER_CONSTANTS } from "./config/router-constants";
import LazyComponent from "./shared/LazyComponent/LazyComponent";
import { AccessoryRouteTypeMap } from "./modules/config/AccessoryConfig";
import { lazy } from "react";

const AccessoryRouteGuard = () => {
  const { accessoryType } = useParams();

  if (!AccessoryRouteTypeMap[accessoryType as string]) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

const AddAccessory = lazy(
  () => import("./modules/admin/ManageAccessory/AddAccessory"),
);

const AccessoryListing = lazy(
  () => import("./modules/AccessoryListing/AccessoryListing"),
);

const AccessoryDetais = lazy(
  () => import("./modules/AccessoryDetails/AccessoryDetails"),
);

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
                  <LazyComponent>
                    <AddAccessory />
                  </LazyComponent>
                ),
              },
            ],
          },
        ],
      },
      {
        path: ":accessoryType",
        element: <AccessoryRouteGuard />,
        children: [
          {
            path: ":id",
            element: (
              <LazyComponent>
                <AccessoryDetais />
              </LazyComponent>
            ),
          },
          {
            path: "",
            element: (
              <LazyComponent>
                <AccessoryListing />
              </LazyComponent>
            ),
          },
        ],
      },
    ],
  },
]);
