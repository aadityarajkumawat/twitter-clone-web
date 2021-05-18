import React, { Fragment } from "react";
import { Route, useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { SplashLoading } from "./SplashLoading";

interface PrivateRouteProps {
    path: string;
    component: React.FC<any>;
}

export const NOT_AUTH = "n";
export const AUTH = "y";
export const LOADING = "l";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component,
    path,
}) => {
    const Component = component;
    const [{ data, fetching }] = useMeQuery();
    const location = useLocation();

    let isAuth = LOADING;

    if (!fetching) {
        if (data && data.me.user.id) {
            isAuth = AUTH;
        } else {
            isAuth = NOT_AUTH;
        }
    }

    if (isAuth === LOADING) {
        return <SplashLoading />;
    }

    return (
        <Fragment>
            {isAuth === AUTH ? (
                <Route exact>
                    {location.pathname === "/home" ? (
                        <Component />
                    ) : (
                        <Fragment></Fragment>
                    )}
                </Route>
            ) : (
                <Route>
                    <Redirect exact to="/login" />
                </Route>
            )}
        </Fragment>
    );
};
