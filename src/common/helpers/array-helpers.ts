export class ArrayHelpers {
    public static groupBy<T, K extends keyof T>(arr: T[], key: K): { [key: string]: T[] } {
        return arr.reduce((rv, x) => {
            // @ts-ignore
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
}
