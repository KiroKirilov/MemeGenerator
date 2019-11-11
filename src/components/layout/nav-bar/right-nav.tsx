import * as React from "react";
import { Menu } from "antd";
import { NavProps } from "./nav-props";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { AuthActions } from "../../../store/actions/auth-actions";
import { appRoutes } from "../../../common/constants/app-routes";

export const RightNav: React.FC<NavProps> = (props: NavProps) => {
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuthenticated = !auth.isEmpty;

    return (
        <Menu
            mode={props.mode}
            selectedKeys={[location.pathname]}>
            {isAuthenticated
                ? null
                : <Menu.Item key={appRoutes.login}>
                    <NavLink to={appRoutes.login}>Login</NavLink>
                </Menu.Item>}

            {isAuthenticated
                ? null
                : <Menu.Item key={appRoutes.register}>
                    <NavLink to={appRoutes.register}>Register</NavLink>
                </Menu.Item>}

            {isAuthenticated
                ? <Menu.Item key={appRoutes.profile}>
                    <NavLink to={appRoutes.profile}>Profile</NavLink>
                </Menu.Item>
                : null}

            {isAuthenticated
                ? <Menu.Item key="auth">
                    <div onClick={() => {
                        dispatch(AuthActions.logout());
                        history.push(appRoutes.home);
                    }} className="nav-link-item">Log out</div>
                </Menu.Item>
                : null}
        </Menu >
    );
}
