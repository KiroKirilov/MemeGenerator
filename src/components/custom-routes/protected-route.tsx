import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { appRoutes } from "../../common/constants/app-routes";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../types/redux-store";

export type ProtectedRouteProps = { component: React.Component | React.FC } & RouteProps;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, ...rest }: ProtectedRouteProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated: boolean = !auth.isEmpty;
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated
                ? React.createElement(component, props)
                : <Redirect to={{ pathname: appRoutes.login, state: { from: props.location } }} />
        )} />
    );
};