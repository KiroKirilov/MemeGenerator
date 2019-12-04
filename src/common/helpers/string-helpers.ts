export class StringHelpers {
    public static joinClassNames(...classNames: string[]): string {
        return classNames.filter(Boolean).join(" ");
    }

    public static generateGuid(): string {
        function S4(): string {
            // tslint:disable-next-line: no-bitwise
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        // then to call it, plus stitch in '4' in the third group
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

}