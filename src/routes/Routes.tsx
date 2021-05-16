import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/Register";
import Home from "../pages/Home";
import { OpenTweet } from "../pages/OpenTweet/OpenTweet";
import { ProfileWrapper } from "../pages/ProfileWrapper";
import { PrivateRoute } from "./PrivateRoute";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = (): JSX.Element => {
    return (
        <Fragment>
            <Route exact path="/">
                <Redirect exact to="/home" />
            </Route>
            <PrivateRoute path="/home" component={Home} />
            <Route path="/:username" exact component={ProfileWrapper} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route
                path="/status/:username/:tweet_id"
                exact
                component={OpenTweet}
            />
        </Fragment>
    );
};

export default Routes;
