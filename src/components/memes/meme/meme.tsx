import * as React from "react";
import { memo } from "react";
import { MemeProps } from "./meme-props";
import { Card } from "antd";
import { default as classes } from "./meme.module.scss";
import { MemeFooter } from "../meme-footer/meme-footer";
import { MemeImage } from "../meme-image/meme-image";
import { MemeHeader } from "../meme-header/meme-header";

export const Meme: React.FC<MemeProps> = memo((props: MemeProps) => {
    return (
        <div>
            <Card cover={<MemeImage imageUrl={props.meme.imageUrl} title={props.meme.title} />} className={classes.memeCard}>

                <div className={classes.cardBody}>
                    <MemeHeader
                        title={props.meme.title}
                        tags={props.meme.tags}
                        createdBy={props.meme.createdBy}
                        // @ts-ignore
                        createdOn={props.meme.createdOn} />

                    <MemeFooter meme={props.meme} />
                </div>

            </Card>
        </div>
    );
});
