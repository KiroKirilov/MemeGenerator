import * as React from "react";
// @ts-ignore
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import "../../../assets/css/tui-color-picker.css";
import icona from "tui-image-editor/dist/svg/icon-a.svg";
import iconb from "tui-image-editor/dist/svg/icon-b.svg";
import iconc from "tui-image-editor/dist/svg/icon-c.svg";
import icond from "tui-image-editor/dist/svg/icon-d.svg";
import { memo, useEffect } from "react";
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

    useEffect(() => {
        const imageWidth: number = 750;
        const imageHeight: number = 536;

        const all: HTMLCollectionOf<Element> = document.getElementsByClassName("tui-image-editor-canvas-container");
        for (let i: number = 0; i < all.length; i++) {
            // @ts-ignore
            all[i].style["margin-top"] = `${imageHeight / imageWidth * 30}%`;
            // @ts-ignore
            all[i].style["padding-top"] = `${imageHeight / imageWidth * 30}%`;
            // @ts-ignore
            all[i].style["padding-bottom"] = `${imageHeight / imageWidth * 70}%`;
        }
    }, []);

    return (
        <div>
            <ImageEditor
                includeUI={{
                    loadImage: {
                        path: "https://www.gannett-cdn.com/presto/2019/07/13/PROC/7ae05c5c-67da-4402-983f-6a3fccb42328-TY_071119_BLAZE_RED_PANDA_SENECA_PARK_ZOO.jpg",
                        name: "Red Panda image"
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
