import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../../store/IStore";
import { Tooltip } from "antd";
import { memo } from "react";
import { SomeActions } from "../../../store/actions/SomeActions";
import { useFirestoreConnect } from 'react-redux-firebase';


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
    const val: string = useSelector((store: any) => store.some.someProp);

    const a = useSelector((state: any) => state.firestore.ordered["test-collection"]);
    const dispatch: React.Dispatch<any> = useDispatch();

    useFirestoreConnect([
        { collection: "test-collection"} 
      ])

    return (
        <div>
            {console.log("register rendered")}
            <div>This is the register {val}</div>
            <button onClick={() => dispatch(SomeActions.makeChange("new val thunk"))}>Thunk</button>

            <Tooltip title="prompt text">
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>

            <div>
                {(a || []).length}
            </div>

            <OtherComp />
        </div>
    );
});

