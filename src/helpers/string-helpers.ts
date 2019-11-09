export class StringHelpers {
    public static joinClassNames(...classNames: string[]): string {
        return classNames.filter(Boolean).join(" ");
    }
}