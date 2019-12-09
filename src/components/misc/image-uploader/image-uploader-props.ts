export type ImageUploaderProps = {
    onFileUploaded?: (b64: string) => void;
    buttonClasses?: string;
    buttonText?: string;
    buttonIcon?: string;
    buttonType?: "link" | "default" | "ghost" | "primary" | "dashed" | "danger";
}