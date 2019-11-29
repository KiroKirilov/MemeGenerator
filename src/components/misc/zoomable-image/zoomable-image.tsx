import * as React from "react";
import { memo, useEffect } from "react";
import { ZoomableImageProps } from "./zoomable-image-props";
import $ from "jquery";
import "magnific-popup";
import "magnific-popup/dist/magnific-popup.css";

const magnificPopupOptions: any = {
    type: "image",
    image: {
        verticalFit: true,
    },
    closeOnContentClick: true,
    closeBtnInside: false,
    showCloseBtn: false,
};

export const ZoomableImage: React.FC<ZoomableImageProps> = memo((props: ZoomableImageProps) => {

    function bindImageZoom(): void {
        $("img[data-gallary-image]").click(function(): void {
            // @ts-ignore
            $(this).magnificPopup(magnificPopupOptions).magnificPopup("open");
        });
    }

    useEffect(() => {
        bindImageZoom();
    }, []);

    return (
        <div className={props.containerClasses}>
            <img style={{
                cursor: "zoom-in"
            }} data-gallary-image data-mfp-src={props.imageSrc} className={props.imageClasses} src={props.imageSrc} alt={props.alt} />
        </div>
    );
});
