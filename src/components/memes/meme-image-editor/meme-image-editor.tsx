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
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { ImageHelpers } from "../../../common/helpers/image-helpers";
import { MemeUploadActions } from "../../../store/actions/meme-upload-actions";

const delayBeforeResize: number = 300;

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

const debouncedReziseEditor: () => Promise<void> = DebouncePromise(resizeImageEditor, delayBeforeResize);

const blackTheme: any = {
    "menu.normalIcon.path": icond,
    "menu.activeIcon.path": iconb,
    "menu.disabledIcon.path": icona,
    "menu.hoverIcon.path": iconc,
    "submenu.normalIcon.path": icond,
    "submenu.activeIcon.path": iconb,
};

export const MemeImageEditor: React.FC = memo(() => {
    const imageUrl: string = useSelector((store: ReduxStore) => store.memeUpload.uploadedImageSrc || "");

    const editorRef: React.RefObject<ImageEditorRef> = React.createRef<ImageEditorRef>();
    const dispatch = useDispatch();

    async function setCanvasSize(): Promise<void> {
        const image: HTMLImageElement = await ImageHelpers.loadImage(imageUrl);

        const imageWidth: number = image.width;
        const imageHeight: number = image.height;

        const canvasContainers: HTMLCollectionOf<Element> = document.getElementsByClassName("tui-image-editor-canvas-container");
        for (let i: number = 0; i < canvasContainers.length; i++) {
            // @ts-ignore
            canvasContainers[i].style["padding-top"] = `${imageHeight / imageWidth * 100}%`;
        }
    }

    async function resizeHandler(_event: UIEvent): Promise<void> {
        await debouncedReziseEditor();
    }

    async function setCorrectSizes(): Promise<void> {
        if (editorRef.current) {
            try {
                dispatch(MemeUploadActions.editorLoaded(editorRef));
                if (window) {
                    window.addEventListener("resize", resizeHandler);
                }

                await setCanvasSize();

                await debouncedReziseEditor();
            } catch (error) {
                // ¯\_(ツ)_/¯ too bad
            }
        }
    }

    useEffect(() => {
        setCorrectSizes();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };

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
