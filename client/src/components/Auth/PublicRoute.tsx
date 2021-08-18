import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  [key: string]: any;
}

const PublicRoute = ({
  children,
  isAuthenticated,
  ...rest
}: PublicRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/portal",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
