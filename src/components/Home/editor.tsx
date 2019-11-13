import * as React from "react";
// @ts-ignore
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import "../../assets/css/tui-color-picker.css";
import icona from "tui-image-editor/dist/svg/icon-a.svg";
import iconb from "tui-image-editor/dist/svg/icon-b.svg";
import iconc from "tui-image-editor/dist/svg/icon-c.svg";
import icond from "tui-image-editor/dist/svg/icon-d.svg";
import { memo } from "react";

export const Editor: React.FC = memo(() => {
    const blackTheme: any = { // or white
        // main icons
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
                    // menu: ["shape", "filter", "text"],
                    initMenu: "text",
                    uiSize: {
                        width: "1000px",
                        height: "800px"
                    },
                    menuBarPosition: "bottom",
                    theme: blackTheme
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={true}
            />
        </div>
    );
});