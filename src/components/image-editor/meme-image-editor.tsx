import * as React from "react";
// @ts-ignore
import ImageEditor from "./node_modules/@toast-ui/react-image-editor";
import "./node_modules/tui-image-editor/dist/tui-image-editor.css";
import "../../assets/css/tui-color-picker.css";
import icona from "./node_modules/tui-image-editor/dist/svg/icon-a.svg";
import iconb from "./node_modules/tui-image-editor/dist/svg/icon-b.svg";
import iconc from "./node_modules/tui-image-editor/dist/svg/icon-c.svg";
import icond from "./node_modules/tui-image-editor/dist/svg/icon-d.svg";
import { memo } from "react";
import "./meme-image-editor.scss";

export const MemeImageEditor: React.FC = memo(() => {
    const blackTheme: any = {
        "menu.normalIcon.path": icond,
        "menu.activeIcon.path": iconb,
        "menu.disabledIcon.path": icona,
        "menu.hoverIcon.path": iconc,
        "submenu.normalIcon.path": icond,
        "submenu.activeIcon.path": iconb,
    };
    return (
        <div>
            <ImageEditor
                includeUI={{
                    loadImage: {
                        path: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Donkey_1_arp_750px.jpg",
                        name: "Donkey image"
                    },
                    menu: ["text"],
                    initMenu: "text",
                    uiSize: {
                        height: "800px"
                    },
                    menuBarPosition: "bottom",
                    theme: blackTheme
                }}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={true}
            />
        </div>
    );
});
