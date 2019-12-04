export class FucntionHelpers {
    public static async repeatPromise(times: number, delay: number, func: () => Promise<any>): Promise<void> {
        for (let i: number = 0; i < times; i++) {
            await func();
            await FucntionHelpers.wait(delay);
        }
    }

    public static wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}