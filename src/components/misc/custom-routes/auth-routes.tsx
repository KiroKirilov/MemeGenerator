import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";
import { ReduxStore } from "../../../types/redux-store";
import { appRoutes } from "../../../common/constants/app-routes";

export type ProtectedRouteProps = {
    component: React.Component | React.FC;
    redirectTo?: string;
 } & RouteProps;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = memo(({ component, ...rest }: ProtectedRouteProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated: boolean = !auth.isEmpty;
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated
                ? React.createElement(component, props)
                : <Redirect to={{ pathname: rest.redirectTo || appRoutes.login, state: { from: props.location } }} />
        )} />
    );
});

export const AnonymousOnlyRoute: React.FC<ProtectedRouteProps> = memo(({ component, ...rest}: ProtectedRouteProps) => {
    const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated: boolean = !!auth.isEmpty;
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated
                ? React.createElement(component, props)
                : <Redirect to={{ pathname: rest.redirectTo || appRoutes.home, state: { from: props.location } }} />
        )} />
    );
});