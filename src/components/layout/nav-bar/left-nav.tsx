import * as React from 'react';
import { Menu } from 'antd';
import { NavProps } from './nav-props';
import { NavLink, useLocation } from 'react-router-dom';

export const LeftNav: React.FC<NavProps> = (props: NavProps) => {
    const location = useLocation();

    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode={props.mode}>
            <Menu.Item key="/">
                <NavLink to="/">Home</NavLink>
            </Menu.Item>

            <Menu.Item key="/editor">
                <NavLink to="/editor">Editor</NavLink>
            </Menu.Item>
        </Menu>
    );
}
