import * as React from "react";
import { Menu } from "antd";
import { NavProps } from "./nav-props";
import { NavLink, useLocation } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import { memo } from "react";

export const LeftNav: React.FC<NavProps> = memo((props: NavProps) => {
    const location = useLocation();

    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode={props.mode}>

            <Menu.Item key={appRoutes.submit}>
                <NavLink to={appRoutes.submit}>Submit meme</NavLink>
            </Menu.Item>
        </Menu>
    );
});
