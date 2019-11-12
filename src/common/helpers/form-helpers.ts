export class FormHelpers {
    public static registerField(register: () => any, validationRules?: any) {
        return (fieldRef: any) => {
            if (fieldRef) {
                // @ts-ignore
                return register(validationRules || {})(fieldRef.input);
            }
        }
    }
}