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
    closeOnContentClick: false,
    closeBtnInside: false,
    showCloseBtn: true,
    closeOnBgClick: true,
    callbacks: {
        imageLoadComplete: function () {
            const imageJquery = $(".mfp-img");
            imageJquery.css("cursor", "zoom-in");
            imageJquery.on("click", (e) => {
                const clickedImage = e.target;
                clickedImage.style.maxHeight = "unset";
                const currWidth = clickedImage.clientWidth;
                clickedImage.style.width = (currWidth + 100) + "px";
            })
        },
        close: function () {
            $(".mfp-img").off("click");
        }
    }
};

export const ZoomableImage: React.FC<ZoomableImageProps> = memo((props: ZoomableImageProps) => {

    function bindImageZoom(): void {
        $("img[data-gallary-image]").click(function (): void {
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
