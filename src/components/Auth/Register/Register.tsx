import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../../store/IStore";

export const Register: React.FC = React.memo(() => {
    const val = useSelector((store: IStore) => store.someProp)
    const dispatch = useDispatch();

    return (
        <div>
        <div>This is the register {val}</div>
        <button onClick={() => dispatch({type: "CHANGE_PROP", payload: "new val"})}>asdasd</button>
        </div>
    )
});