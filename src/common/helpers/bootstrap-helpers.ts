import {default as bootstrap} from "../styles/bootstrapGrid.module.scss";
import { StringHelpers } from "./string-helpers";

export class BootstrapHelpers {
    public static formFieldClasses = StringHelpers.joinClassNames(bootstrap.colxl3, bootstrap.colLg3, bootstrap.colMd6, bootstrap.colSm12);
}