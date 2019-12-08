import * as React from "react";
import { memo, useEffect, useState } from "react";
import { MemeHeaderProps } from "./meme-header-props";
import { default as classes } from "./meme-header.module.scss";
import { default as bootstrap } from "../../../common/styles/bootstrapGrid.module.scss";
import { Tag as TagComponent, Card } from "antd";
import { StringHelpers } from "../../../common/helpers/string-helpers";
import { useFirestore, ExtendedFirestoreInstance } from "react-redux-firebase";
import { DocumentSnapshot, DocumentData } from "@firebase/firestore-types";
import { generatePath, NavLink } from "react-router-dom";
import { appRoutes } from "../../../common/constants/app-routes";
import { MemeHeaderState } from "./meme-header-state";
import moment from "moment";

export const MemeHeader: React.FC<MemeHeaderProps> = memo((props: MemeHeaderProps) => {
    const firestore: ExtendedFirestoreInstance = useFirestore();
    const [user, setUser] = useState<MemeHeaderState | null>(null);

    useEffect(() => {
        loadCreator();
    }, []);

    async function loadCreator(): Promise<void> {
        try {
            const user: DocumentSnapshot = await firestore.doc(props.userPath).get();
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

    // get offset to be used in with seconds. * 60 becuase it's in minutes by default and we need it in seconds
    const offset: number = new Date().getTimezoneOffset();
    const date: Date = new Date(1970, 0, 1);
    date.setSeconds(props.createdOn.seconds - offset * 60);
    const submittedString: string = moment(date).fromNow();

    return (
        <div className={StringHelpers.joinClassNames(bootstrap.row, classes.headerContainer)}>
            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <Card.Meta title={props.title} />
            </div>

            {
                user && user.username
                    ? <div className={classes.userProfileLink}>
                        submitted {submittedString} by <NavLink to={generatePath(appRoutes.user, { userId: user.id })}>{user.username}</NavLink>
                    </div>
                    : null
            }


            <div className={StringHelpers.joinClassNames(bootstrap.col12)}>
                <div className={StringHelpers.joinClassNames(classes.tagsContainer, bootstrap.dFlex)}>
                    {
                        props.tags.map((tag: string) => (<TagComponent key={tag}>{tag}</TagComponent>))
                    }
                </div>
            </div>
        </div>
    );
});
