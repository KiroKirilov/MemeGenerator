import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../../store/IStore";
import { Tooltip } from "antd";
import { memo } from "react";
import { SomeActions } from "../../../store/actions/SomeActions";


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
    const val: string = useSelector((store: IStore) => store.someProp);
    const dispatch: React.Dispatch<any> = useDispatch();

    return (
        <div>
            <div>This is the register {val}</div>
            <button onClick={() => dispatch(SomeActions.makeChange("new val thunk"))}>Thunk</button>

            <Tooltip title="prompt text">
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>

            <OtherComp />
        </div>
    );
});

