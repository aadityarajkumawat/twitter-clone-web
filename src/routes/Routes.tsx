import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/Register";
import Home from "../pages/Home";
import { Profile } from "../pages/Profile/Profile";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/profile/:username" exact component={Profile} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Fragment>
  );
};
export default Routes;
