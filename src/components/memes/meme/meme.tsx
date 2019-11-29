import * as React from "react";
import { memo } from "react";
import { MemeProps } from "./meme-props";
import { Card } from "antd";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { default as classes } from "./meme.module.scss";
import { ZoomableImage } from "../../misc/zoomable-image/zoomable-image";

export const Meme: React.FC<MemeProps> = memo((props: MemeProps) => {

    return (
        <div>
            <Card className={classes.memeCard}>
                <div className={bootstrap.row}>
                    <div className={StringHelpers.joinClassNames(bootstrap.col12, bootstrap.dFlex, bootstrap.justifyContentCenter)}>
                        <div className={classes.cardTitle}>{props.meme.title}</div>
                    </div>
                </div>
                <div className={StringHelpers.joinClassNames(
                    classes.imageContainer,
                    bootstrap.row,
                    bootstrap.dFlex,
                    bootstrap.justifyContentCenter)}>
                    <ZoomableImage imageClasses={classes.image} alt={props.meme.title} imageSrc={props.meme.imageUrl} />
                </div>
            </Card>
        </div>
    );
});
