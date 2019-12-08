export type ImageUploaderProps = {
    onFileUploaded?: (b64: string) => void;
    buttonClasses?: string;
    buttonText?: string;
}