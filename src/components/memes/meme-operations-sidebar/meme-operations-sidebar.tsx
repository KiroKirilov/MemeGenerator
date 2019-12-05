import * as React from "react";
import { memo } from "react";
import { Button, Icon } from "antd";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { MemeOperationsActions } from "../../../store/actions/meme-oprations-actions";
import { SortType } from "../../../models/meme-operations/sort-type";
import { ReduxStore } from "../../../types/redux-store";
import { default as classes } from "./meme-operations-sidebar.module.scss";
import { MemeSortOperations } from "../meme-sort-operations/meme-sort-operations";
import { MemeFilterOperations } from "../meme-filter-operations/meme-filter-operations";

export const MemeOperationsSidebar: React.FC = memo(() => {
    return (
        <div>
            <MemeFilterOperations />
            <MemeSortOperations />
        </div>
    );
});
