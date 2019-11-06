import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../../store/IStore";
import { Tooltip } from "antd";

export const Register: React.FC = React.memo(() => {
    const val = useSelector((store: IStore) => store.someProp)
    const dispatch = useDispatch();

    return (
        <div>
            <div>This is the register {val}</div>
            <button onClick={() => dispatch({ type: "CHANGE_PROP", payload: "new val" })}>asdasd</button>

            <Tooltip title="prompt text">
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>
        </div>
    )
});