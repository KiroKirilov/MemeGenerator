import * as React from "react";
import { memo } from "react";
import { MemeProps } from "./meme-props";
import { Card, Tag as TagComponent, Icon, notification, Tooltip } from "antd";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { default as classes } from "./meme.module.scss";
import { ZoomableImage } from "../../misc/zoomable-image/zoomable-image";
import { Tag } from "../../../models/memes/tag";
import { ImageHelpers } from "../../../common/helpers/image-helpers";
import download from "downloadjs";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../types/redux-store";
import { generatePath } from "react-router";
import { appRoutes } from "../../../common/constants/app-routes";

export const Meme: React.FC<MemeProps> = memo((props: MemeProps) => {
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const isAuthenticated = !auth.isEmpty;

    async function downloadMeme() {
        try {
            const imageB64 = await ImageHelpers.ensureDataUrl(props.meme.imageUrl);
            download(imageB64, `${StringHelpers.generateGuid()}.${ImageHelpers.getImageExtensionFromDataUrl(imageB64)}`);
        } catch (error) {
            notification.error({
                message: "Couldn't download the image, please try again.",
            })
        }
    }

    async function copyShareUrl() {
        try {
            const detailsPath = generatePath(appRoutes.memes.details, { memeId: props.meme.id });
            const detailsUrl = `${window.location.protocol + '//' + window.location.host}${detailsPath}`;
            await navigator.clipboard.writeText(detailsUrl);
            notification.info({
                message: "Copied!"
            });
        } catch (error) {
            notification.error({
                message: "Couldn't copy url, pelase try again.",
            })
        }
    }

    return (
        <div>
            <Card className={classes.memeCard}>
                <div className={StringHelpers.joinClassNames(bootstrap.row, classes.headerContainer)}>
                    <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                        <div className={classes.cardTitle}>{props.meme.title}</div>
                    </div>

                    <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                        <div className={StringHelpers.joinClassNames(classes.tagsContainer, bootstrap.dFlex)}>
                            {
                                props.meme.tags.map((tag: Tag) => (<TagComponent key={tag.id}>{tag.name}</TagComponent>))
                            }
                        </div>
                    </div>
                </div>

                <div className={StringHelpers.joinClassNames(
                    classes.imageContainer,
                    bootstrap.row,
                    bootstrap.dFlex,
                    bootstrap.justifyContentCenter)}>
                    <ZoomableImage imageClasses={classes.image} alt={props.meme.title} imageSrc={props.meme.imageUrl} />
                </div>

                <div className={StringHelpers.joinClassNames(bootstrap.row, classes.footerContainer, bootstrap.dFlex, bootstrap.alignItemsCenter)}>
                    <div className={StringHelpers.joinClassNames(bootstrap.col6)}>
                        {
                            isAuthenticated
                                ? <Icon className={classes.actionIcon} type="up-circle" />
                                : null
                        }
                        <span className={StringHelpers.joinClassNames(classes.actionIcon, classes.score)}>0</span>
                        {
                            isAuthenticated
                                ? <Icon className={classes.actionIcon} type="down-circle" />
                                : null
                        }
                    </div>

                    <div className={StringHelpers.joinClassNames(bootstrap.col6, bootstrap.dFlex, bootstrap.flexRowReverse)}>
                        <Icon onClick={downloadMeme} className={classes.actionIcon} type="download" />

                        <Tooltip title="Copy url for sharing">
                            <Icon onClick={copyShareUrl} className={StringHelpers.joinClassNames(classes.actionIcon, classes.copyIcon)} type="copy" />
                        </Tooltip>
                    </div>
                </div>
            </Card>
        </div>
    );
});
