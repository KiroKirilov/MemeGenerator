import * as React from "react";
import { Menu } from "antd";
import { NavProps } from "./nav-props";
import { NavLink, useLocation, useHistory, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { AuthActions } from "../../../store/actions/auth-actions";
import { appRoutes } from "../../../common/constants/app-routes";
import { memo } from "react";
import { UserAvatar } from "../../user/user-avatar/user-avatar";

export const RightNav: React.FC<NavProps> = memo((props: NavProps) => {
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const profile = useSelector((store: ReduxStore) => store.firebase.profile);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuthenticated = !auth.isEmpty;
    const userProfilePath = generatePath(appRoutes.user, { userId: auth.uid });

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

            {isAuthenticated && profile.isLoaded
                ? <Menu.Item key={userProfilePath}>
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <NavLink style={{ padding: 0 }} to={userProfilePath}>
                            <UserAvatar
                                hideRemove={true}
                                userId={auth.uid}
                                size={props.isInDrawer ? 37 : undefined}
                                style={{
                                    marginRight: props.isInDrawer ? "10px" : undefined
                                }}
                                avatarUrl={profile.avatarUrl}
                                username={profile.username}
                                disableChange={true} />
                        </NavLink>

                        <NavLink to={userProfilePath}>{profile.username || "Profile"}</NavLink>
                    </div>
                </Menu.Item>
                : null}

            {
                isAuthenticated
                    ? <Menu.Item key={appRoutes.memes.submit}>
                        <NavLink to={appRoutes.memes.submit}>Submit meme</NavLink>
                    </Menu.Item>
                    : null
            }


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
});
