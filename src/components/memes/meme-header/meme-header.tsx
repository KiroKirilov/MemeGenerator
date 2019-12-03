import * as React from "react";
import { memo, useEffect, useState } from "react";
import { MemeHeaderProps } from "./meme-header-props";
import { default as classes } from "./meme-header.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { Tag as TagComponent, Card } from "antd";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { Tag } from "../../../models/memes/tag";
import { useFirestore, ExtendedFirestoreInstance } from "react-redux-firebase";
import { DocumentSnapshot, DocumentData } from "@firebase/firestore-types";
import { generatePath } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import { MemeHeaderState } from "./meme-header-state";

export const MemeHeader: React.FC<MemeHeaderProps> = memo((props: MemeHeaderProps) => {
    const firestore: ExtendedFirestoreInstance = useFirestore();
    const [user, setUser] = useState<MemeHeaderState | null>(null);

    useEffect(() => {
        loadCreator();
    }, []);

    async function loadCreator(): Promise<void> {
        try {
            const user: DocumentSnapshot = await firestore.doc("users/ckTMqSD5uieJ8VwmkjARmsPx0Qn1").get();
            const userData: DocumentData | undefined = user.data();
            if (userData) {
                setUser({
                    id: user.id,
                    username: userData.username,
                });
            }
        } catch (error) {
            // ¯\_(ツ)_/¯
        }
    }
    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, classes.headerContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <Card.Meta title={props.title} />
            </div>

            {
                user && user.username
                    ? <div className={classes.userProfileLink}>
                        by <a href={generatePath(appRoutes.profile.user, { userId: user.id })}>{user.username}</a>
                    </div>
                    : null
            }


            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <div className={StringHelpers.joinClassNames(classes.tagsContainer, bootstrap.dFlex)}>
                    {
                        props.tags.map((tag: Tag) => (<TagComponent key={tag.id}>{tag.name}</TagComponent>))
                    }
                </div>
            </div>
        </div>
    );
});
