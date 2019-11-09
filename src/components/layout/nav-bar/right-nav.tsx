import * as React from 'react';
import { Menu } from 'antd';
import { NavProps } from './nav-props';
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export const RightNav: React.FC<NavProps> = (props: NavProps) => {
    return (
        <Menu mode={props.mode}>

            <Menu.Item key="/login">
                <NavLink to="/login">Login</NavLink>
            </Menu.Item>

            <Menu.Item key="/register">
                <NavLink to="/register">Register</NavLink>
            </Menu.Item>
            
        </Menu>
    );
}
