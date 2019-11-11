import * as React from 'react';
import { RightNav } from './right-nav';
import { LeftNav } from './left-nav';
import { Button, Drawer, Icon } from 'antd';
import "./nav-bar.scss";

export const NavBar: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (

        <nav className="menu">
            <div className="menu__logo">
                <a href="">Logo</a>
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
                    title="Basic Drawer"
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
};