import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Login from "../components/auth/login/Login";
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
    let isAuth = LOADING;

    if (!fetching) {
        if (data && data.me.user.id) {
            isAuth = AUTH;
        } else {
            isAuth = NOT_AUTH;
        }
    }

    return (
        <Fragment>
            {
                <Route
                    path={path}
                    exact
                    component={
                        isAuth === AUTH
                            ? Component
                            : isAuth === LOADING
                            ? SplashLoading
                            : Login
                    }
                />
            }
        </Fragment>
    );
};
