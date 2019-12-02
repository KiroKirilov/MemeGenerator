import * as React from "react";
import { memo } from "react";
import { MemeImageProps } from "./meme-image-props";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { default as classes } from "./meme-image.module.scss";
import { ZoomableImage } from "../../misc/zoomable-image/zoomable-image";
import { StringHelpers } from "../../../common/helpers/string-helpers";

export const MemeImage: React.FC<MemeImageProps> = memo((props: MemeImageProps) => {
    return (
        <div className={StringHelpers.joinClassNames(
            classes.imageContainer,
            bootstrap.dFlex,
            bootstrap.justifyContentCenter)}>
            <ZoomableImage imageClasses={classes.image} alt={props.title} imageSrc={props.imageUrl} />
        </div>
    );
});
