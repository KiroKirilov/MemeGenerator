import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../../store/IStore";
import { Tooltip } from "antd";
import { memo } from "react";

const OtherComp: React.FC = memo(() => {
    const val: string = useSelector((store: IStore) => store.anotherVal);
    return (
        <div>
            {console.log("OtherComp rendered")}
            {val}
        </div>
    );
});

export const Register: React.FC = memo(() => {
    const val: string = useSelector((store: IStore) => store.someProp)
    const dispatch: React.Dispatch<any> = useDispatch();

    return (
        <div>
            {console.log("Register rendered")}
            <div>This is the register {val}</div>
            <button onClick={() => dispatch({ type: "CHANGE_PROP", payload: "new val" })}>asdasd</button>

            <Tooltip title="prompt text">
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>

            <OtherComp />
        </div>
    );
});

