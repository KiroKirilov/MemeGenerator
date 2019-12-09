import * as React from "react";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MemeOperationsActions } from "../../../store/actions/meme-oprations-actions";
import { MemeSortOperations } from "../meme-sort-operations/meme-sort-operations";
import { MemeFilterOperations } from "../meme-filter-operations/meme-filter-operations";
import classes from "./meme-operations.module.scss";

export const MemeOperations: React.FC = memo(() => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(MemeOperationsActions.resetMemeOperations());
        };
    }, []);

    return (
        <div className={classes.operationsWrapper}>
            <MemeFilterOperations />
            <MemeSortOperations />
        </div>
    );
});
