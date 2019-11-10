import * as React from 'react';
import { Menu } from 'antd';
import { NavProps } from './nav-props';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStore } from '../../../types/redux-store';
import { AuthActions } from '../../../store/actions/auth-actions';

export const RightNav: React.FC<NavProps> = (props: NavProps) => {
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    const isAuthenticated = !auth.isEmpty;

    return (
        <Menu
            mode={props.mode}
            selectedKeys={[location.pathname]}>
            {isAuthenticated
                ? null
                : <Menu.Item key="/login">
                    <NavLink to="/login">Login</NavLink>
                </Menu.Item>}

            {isAuthenticated
                ? null
                : <Menu.Item key="/register">
                    <NavLink to="/register">Register</NavLink>
                </Menu.Item>}

            {isAuthenticated
                ? <Menu.Item key="/profile">
                    <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                : null}

            {isAuthenticated
                ? <Menu.Item key="auth">
                    <div onClick={() => dispatch(AuthActions.logout())} className="nav-link-item">Sign Out</div>
                </Menu.Item>
                : null}
        </Menu >
    );
}
