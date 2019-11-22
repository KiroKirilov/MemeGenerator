import * as React from 'react';
import { RightNav } from './right-nav';
import { LeftNav } from './left-nav';
import { Button, Drawer, Icon } from 'antd';
import "./nav-bar.scss";
import { memo, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";
import { appRoutes } from '../../../common/constants/app-routes';

export const NavBar: React.FC = memo(() => {
    const [visible, setVisible] = React.useState(false);

    const location = useLocation();

    useEffect(() => {
        // onRouteChanged
        setVisible(false);
    }, [location]);


    function showDrawer(): void {
        setVisible(true);
    }

    function onClose(): void {
        setVisible(false);
    }

    return (

        <nav className="menu">
            <div className="menu__logo">
                <NavLink to={appRoutes.home}>
                    <img width={135} src={logo} />
                </NavLink>
            </div>

            <div className="menu__container">
                <div className="menu_left">
                    <LeftNav mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightNav mode="horizontal" />
                </div>
                <Button
                    className="menu__mobileButton"
                    type="primary"
                    onClick={showDrawer}
                >
                    <Icon type="menu" />
                </Button>
                <Drawer
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftNav mode="inline" />
                    <RightNav mode="inline" />
                </Drawer>
            </div>
        </nav>
    );
});
