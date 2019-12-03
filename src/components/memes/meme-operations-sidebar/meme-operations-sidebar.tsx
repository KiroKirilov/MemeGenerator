import * as React from "react";
import { memo } from "react";
import { Button, Icon } from "antd";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { MemeOperationsActions } from "../../../store/actions/meme-oprations-actions";
import { SortType } from "../../../models/meme-operations/sort-type";
import { ReduxStore } from "../../../types/redux-store";
import { default as classes } from "./meme-operations-sidebar.module.scss";

export const MemeOperationsSidebar: React.FC = memo(() => {
    const dispatch: Dispatch<any> = useDispatch();
    const sortType: SortType = useSelector((store: ReduxStore) => store.memeOperations.sortType);

    return (
        <div>
            <Button.Group size="default">
                <Button
                    onClick={() => dispatch(MemeOperationsActions.sortTypeChanged(SortType.Hot))}
                    type={sortType === SortType.Hot ? "primary" : "default"}>
                    <Icon
                        className={sortType === SortType.Hot ? classes.activeHotIcon : ""}
                        type="fire"
                        theme="filled" />
                    Hot
                </Button>

                <Button
                    onClick={() => dispatch(MemeOperationsActions.sortTypeChanged(SortType.New))}
                    type={sortType === SortType.New ? "primary" : "default"}>
                    <Icon
                        className={sortType === SortType.New ? classes.activeNewIcon : ""}
                        type="calendar"
                        theme="filled" />
                    New
                </Button>

                <Button
                    onClick={() => dispatch(MemeOperationsActions.sortTypeChanged(SortType.AllTimeBest))}
                    type={sortType === SortType.AllTimeBest ? "primary" : "default"}>
                    <Icon
                        className={sortType === SortType.AllTimeBest ? classes.activeAllTimeIcon : ""}
                        type="heart"
                        theme="filled" />
                    All time best
                </Button>
            </Button.Group>
        </div>
    );
});
