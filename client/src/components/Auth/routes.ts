import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../../pages/Dashboard")),
    exact: true,
  },
];

export default routes;
