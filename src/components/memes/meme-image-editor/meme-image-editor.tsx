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
import { ImageEditorRef } from "../../../types/image-editor-reference";
import DebouncePromise from "awesome-debounce-promise";

const delayBeforeSearch: number = 300;

async function resizeImageEditor(): Promise<void> {
    const canvasContainers: HTMLCollectionOf<Element> = document.getElementsByClassName("tui-image-editor-canvas-container");
    const currentHeight: number = canvasContainers[0].clientHeight;
    const mainContainer: HTMLCollectionOf<Element> = document.getElementsByClassName("tui-image-editor-container bottom");
    const canvas: Element = document.getElementsByClassName("upper-canvas ")[0];
    for (let i: number = 0; i < mainContainer.length; i++) {
        // @ts-ignore
        mainContainer[i].style.height = `${Math.min(currentHeight, canvas.clientHeight) + 275}px`;
    }
}

const debouncedReziseEditor: () => Promise<void> = DebouncePromise(resizeImageEditor, delayBeforeSearch);

export const MemeImageEditor: React.FC = memo(() => {
    const blackTheme: any = {
        "menu.normalIcon.path": icond,
        "menu.activeIcon.path": iconb,
        "menu.disabledIcon.path": icona,
        "menu.hoverIcon.path": iconc,
        "submenu.normalIcon.path": icond,
        "submenu.activeIcon.path": iconb,
    };

    const imageUrl: string = "https://www.gannett-cdn.com/presto/2019/07/13/PROC/7ae05c5c-67da-4402-983f-6a3fccb42328-TY_071119_BLAZE_RED_PANDA_SENECA_PARK_ZOO.jpg";
    // const imageUrl: string = "https://cdn.blackmilkclothing.com/media/wysiwyg/Wallpapers/BM-Wallpapers-Oct_25-1.jpg";

    const editorRef: React.RefObject<ImageEditorRef> = React.createRef<ImageEditorRef>();

    function loadImage(imageSrc: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = new Image();

            image.onload = () => {
                resolve(image);
            };

            image.src = imageSrc;
        });
    }

    async function setCanvasSize() {
        const image: HTMLImageElement = await loadImage(imageUrl);

        const imageWidth: number = image.width;
        const imageHeight: number = image.height;

        const canvasContainers: HTMLCollectionOf<Element> = document.getElementsByClassName("tui-image-editor-canvas-container");
        for (let i: number = 0; i < canvasContainers.length; i++) {
            // @ts-ignore
            canvasContainers[i].style["padding-top"] = `${imageHeight / imageWidth * 100}%`;
        }
    }

    async function resizeHandler (_event: UIEvent) {
        await debouncedReziseEditor();
    }

    useEffect(() => {
        const setImageSize: () => Promise<void> = async () => {
            if (editorRef.current) {
                try {
                    if (window) {
                        window.addEventListener("resize", resizeHandler);
                    }

                    await setCanvasSize();

                    await debouncedReziseEditor();
                } catch (error) {
                    // ¯\_(ツ)_/¯ too bad
                }
            }
        };

        setImageSize();


        return () => {
            window.removeEventListener("resize", resizeHandler);
        }

    }, [editorRef.current]);

    return (
        <div>
            <ImageEditor
                ref={editorRef}
                includeUI={{
                    loadImage: {
                        path: imageUrl,
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
