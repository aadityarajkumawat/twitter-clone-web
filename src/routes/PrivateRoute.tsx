import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { useStore } from "../zustand/store";

interface PrivateRouteProps {
  path: string;
  component: React.FC<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  path,
}) => {
  const Component = component;
  const isAuth = useStore((s) => s.authenticated);

  return (
    <Fragment>
      <Route
        path={path}
        exact
        render={() => (isAuth ? <Component /> : <Redirect to="/login" />)}
      />
    </Fragment>
  );
};
