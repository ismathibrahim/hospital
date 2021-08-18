import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

type RouteType = {
  component: React.ElementType;
  path: string;
  exact: boolean;
};

const ProtectedRoutes = () => (
  <Switch>
    <Suspense fallback={<div>Loading</div>}>
      {routes.map(({ path, exact, component: Component }: RouteType) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
